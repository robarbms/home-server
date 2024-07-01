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
        >
            <>
                <h2>Open WebUI</h2>
                <p>Basic web chat interface for multiple models.</p>
                <h3>Links</h3>
                <ul>
                    <li><a className="link" href="https://openwebui.com/" target="_blank">Home page</a></li>
                    <li><a className="link" href="https://docs.openwebui.com/" target="_blank">Documentation</a></li>
                    <li><a className="link" href="https://github.com/open-webui/open-webui" target="_blank">GitHub</a></li>
                </ul>
            </>
        </Card>
    )
}