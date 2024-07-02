import React from 'react';
import Card, { CardLink } from '../Card';

export default function Ollama() {
    const link: CardLink = {
        link: "http://home:42421",
        text: "Ollama"
    }


    return(
        <Card
            heading="Ollama"
        >
            <>
                <p>Backend web service for LLM API. Used by frontends like Open WebUI. Can be found on port 11434. http://home:11434</p>
                <h3>Links</h3>
                <ul>
                    <li><a className="link" href="https://ollama.com/" target="_blank">Home page</a></li>
                    <li><a className="link" href="https://ollama.com/library" target="_blank">Models</a></li>
                    <li><a className="link" href="https://github.com/ollama/ollama" target="_blank">GitHub</a></li>
                </ul>
            </>
        </Card>
    )
}