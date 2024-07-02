import React from 'react';
import Card, { CardLink } from '../Card';

export default function Fooocus() {
    const link: CardLink = {
        link: "http://home:42424",
        text: "Launch Fooocus"
    }


    return(
        <Card
            heading="Fooocus"
            footer={link}
        >
            <>
                <p>Simple image generation similar to Midjourney.</p>
                <h3>Links</h3>
                <ul>
                    <li><a className="link" href="https://fooocus.one/" target="_blank">Home page</a></li>
                    <li><a className="link" href="https://www.reddit.com/r/fooocus/" target="_blank">Reddit</a></li>
                    <li><a className="link" href="https://github.com/lllyasviel/Fooocus" target="_blank">GitHub</a></li>
                </ul>
            </>
        </Card>
    )
}