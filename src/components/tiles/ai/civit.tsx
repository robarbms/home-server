import React from 'react';
import Card, {CardLink} from '../Card';

export default function Civit() {

    const link: CardLink = {
        link: "https://civitai.com/",
        text: "Open Civit.ai"
    }

    return(
        <Card
            heading="Civit.ai"
        >
            <>
                <p>Resources for ComfyUI</p>
                <h3>Links</h3>
                <ul>
                <li><a className="link" href="https://civitai.com/" target="_blank">Civit</a></li>
                </ul>
            </>
        </Card>
    )
}