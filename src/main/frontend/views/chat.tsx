
import { TextField } from '@vaadin/react-components/TextField.js';
import { Button } from '@vaadin/react-components/Button.js';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatAiService } from 'Frontend/generated/endpoints';

export default function Chat() {
    const[question, setQuestion] = useState<string>('');
    const[response, setRespnse] = useState<string>('');

    async function send() {
        ChatAiService.ragChat(question)
            .then((resp) => {
                setRespnse(resp);
            })
            .catch((error) => {
                console.error('Error fetching response:', error);
            });
    }
    return (
        <div className="p-m">
            <h3>CHat Bot</h3>
            <div>
                <TextField style={{width:'80%'}} 
                           onChange={(e=>setQuestion(e.target.value))}/>
                <Button theme="primary" onClick={send}>Send</Button>
                <div>
                    <ReactMarkdown>
                    {response}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}