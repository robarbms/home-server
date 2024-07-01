import React from 'react';
import Card, {CardLink} from '../Card';

export default function ComfyUI() {

    const link: CardLink = {
        link: "http://home:8188/",
        text: "Launch ComfyUI"
    }

    return(
        <Card
            heading="ComfyUI"
            footer={link}
        >
            <>
                <p>Text to image generation using a graph flow system.</p>
                <h3>Links</h3>
                <ul>
                    <li><a className="link" href="https://github.com/comfyanonymous/ComfyUI" target="_blank">GitHub</a></li>
                    <li><a className="link" href="https://www.reddit.com/r/comfyui/" target="_blank">Reddit</a></li>
                </ul>
            </>
        </Card>
    )
}