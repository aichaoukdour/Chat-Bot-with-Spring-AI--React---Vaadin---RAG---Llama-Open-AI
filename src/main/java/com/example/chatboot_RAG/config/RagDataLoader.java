package com.example.chatboot_RAG.config;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.ai.vectorstore.pgvector.PgVectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import com.google.common.hash.Hashing;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class RagDataLoader {

    @Value("classpath:/pdfs/cv.pdf")
    private Resource pdfResource;

    @Value("${rag.chunk.size:512}")
    private int chunkSize;

    @Value("${rag.chunk.overlap:50}")
    private int chunkOverlap;

    @Bean
    @Transactional
    public VectorStore vectorStore(EmbeddingModel embeddingModel, JdbcTemplate jdbcTemplate) {
        PgVectorStore vectorStore = PgVectorStore.builder(jdbcTemplate, embeddingModel).build();

        try {
            // Validate PDF resource
            if (!pdfResource.exists()) {
                throw new IllegalStateException("PDF resource not found at classpath:/pdfs/cv.pdf");
            }
            if (!pdfResource.isReadable()) {
                throw new IllegalStateException("PDF resource is not readable: " + pdfResource.getFilename());
            }
            log.info("PDF resource found: {}, readable: {}", pdfResource.getFilename(), pdfResource.isReadable());

            // Use the resource's filename as the identifier
            String pdfPath = pdfResource.getFilename();
            String contentHash = calculateContentHash(pdfResource);

            if (!isDocumentEmbedded(jdbcTemplate, pdfPath, contentHash)) {
                log.info("Processing PDF: {}", pdfPath);

                // Pass the Resource to PagePdfDocumentReader
                PagePdfDocumentReader pdfReader = new PagePdfDocumentReader(pdfResource);
                List<Document> documents;
                try {
                    documents = pdfReader.get();
                } catch (Exception e) {
                    throw new IllegalStateException("Failed to parse PDF document: " + pdfPath, e);
                }

                if (documents.isEmpty()) {
                    log.warn("No content extracted from PDF: {}", pdfPath);
                }

                for (Document doc : documents) {
                    doc.getMetadata().put("file_path", pdfPath);
                    doc.getMetadata().put("content_hash", contentHash);
                    doc.getMetadata().put("created_date", new Date());
                }

                // Validate chunking parameters
                if (chunkSize <= 0) {
                    throw new IllegalArgumentException("chunkSize must be positive: " + chunkSize);
                }
                if (chunkOverlap < 0 || chunkOverlap >= chunkSize) {
                    throw new IllegalArgumentException("chunkOverlap must be non-negative and less than chunkSize: " + chunkOverlap);
                }

    // Use TokenTextSplitter with constructor for chunkSize and chunkOverlap
   TokenTextSplitter textSplitter = new TokenTextSplitter(
    chunkSize,      // defaultChunkSize
    chunkOverlap,   // minChunkSizeChars ou overlap
    50,             // minChunkLengthToEmbed (exemple)
    10000,          // maxNumChunks (exemple)
    true            // keepSeparator
);
    List<Document> chunks = textSplitter.split(documents);

                deleteExistingEmbeddings(jdbcTemplate, pdfPath);
                vectorStore.add(chunks);

                log.info("Stored {} chunks for PDF: {}", chunks.size(), pdfPath);
            } else {
                log.info("PDF already embedded: {}", pdfPath);
            }
        } catch (IOException e) {
            log.error("Failed to process PDF: {}", pdfResource.getFilename(), e);
            throw new RuntimeException("Failed to process PDF: " + pdfResource.getFilename(), e);
        } catch (IllegalArgumentException e) {
            log.error("Invalid configuration: {}", e.getMessage());
            throw new RuntimeException("Invalid configuration: " + e.getMessage(), e);
        }
        return vectorStore;
    }

    private boolean isDocumentEmbedded(JdbcTemplate jdbcTemplate, String pdfPath, String contentHash) {
        try {
            String query = "SELECT COUNT(*) FROM vector_store WHERE metadata->>'file_path' = ? AND metadata->>'content_hash' = ?";
            Long count = jdbcTemplate.queryForObject(query, Long.class, pdfPath, contentHash);
            return count != null && count > 0;
        } catch (Exception e) {
            log.warn("Error checking document existence for {}: {}", pdfPath, e.getMessage());
            return false;
        }
    }

    private void deleteExistingEmbeddings(JdbcTemplate jdbcTemplate, String pdfPath) {
        try {
            String query = "DELETE FROM vector_store WHERE metadata->>'file_path' = ?";
            jdbcTemplate.update(query, pdfPath);
            log.info("Deleted existing embeddings for PDF: {}", pdfPath);
        } catch (Exception e) {
            log.error("Failed to delete embeddings for PDF: {}", pdfPath, e);
        }
    }

    private String calculateContentHash(Resource resource) throws IOException {
        byte[] content = resource.getInputStream().readAllBytes();
        return Hashing.sha256().hashBytes(content).toString();
    }
}