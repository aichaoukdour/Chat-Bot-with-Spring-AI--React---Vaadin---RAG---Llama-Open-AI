import PersonModel from "Frontend/generated/com/example/chatboot_RAG/entities/PersonModel";
import { PersonService } from "Frontend/generated/endpoints";
// import AutoCrud from "Frontend/components/AutoCrud";
import { AutoCrud } from "@vaadin/hilla-react-crud";

export default function Person() {
    return (
        
            <AutoCrud service={PersonService} model={PersonModel}/>
         
    );
}