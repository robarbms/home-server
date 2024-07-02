import React from 'react';
import Card, { CardLink } from '../Card';

export default function OpenWebUI() {
    const link: CardLink = {
        link: "http://home:42421",
        text: "Launch Open WebUI"
    }


    return(
        <Card
            heading="Open WebUI"
            footer={link}
            size="2"
        >
            <>
                <p>Basic web chat interface for multiple models. Some of the models are:</p>
                <div className="cols2">
                    <div>
                        <h3>Models</h3>
                        <ul>
                            <li>Llama 3 - Fast, well-rounded, chat model.</li>
                            <li>Zephyr - Mistral based model.</li>
                            <li>Codeqwen - A fast, compact model for code.</li>
                            <li>Deepseek Coder V2 - Large code model.</li>
                            <li>Codegemma - Google code model.</li>
                            <li>Llava - A multi-modal, image input model.</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>Command-r - 128k context model for RAG.</li>
                            <li>Dolphin Mixtral - 8x7b experts model.</li>
                        </ul>
                        <h3>Links</h3>
                        <ul>
                            <li><a className="link" href="https://openwebui.com/" target="_blank">Home page</a></li>
                            <li><a className="link" href="https://docs.openwebui.com/" target="_blank">Documentation</a></li>
                            <li><a className="link" href="https://github.com/open-webui/open-webui" target="_blank">GitHub</a></li>
                        </ul>
                    </div>
                </div>
            </>
        </Card>
    )
}