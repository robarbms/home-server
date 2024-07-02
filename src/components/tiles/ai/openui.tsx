import React from 'react';
import Card, {CardLink} from '../Card';

export default function OpenUI() {

    const link: CardLink = {
        link: "http://home:42422/ai/new",
        text: "Open OpenUI"
    }

    return(
        <Card
            heading="OpenUI"
            footer={link}
        >
            <>
                <p>Text to UI. Builds out a website with markup, styles, React, and JavaScript based on a description.</p>
                <h3>Links</h3>
                <ul>
                <li><a className="link" href="https://openui.fly.dev/ai/new" target="_blank">Official Site</a></li>
                <li><a className="link" href="https://github.com/wandb/openui" target="_blank">GitHub</a></li>
                </ul>
            </>
        </Card>
    )
}