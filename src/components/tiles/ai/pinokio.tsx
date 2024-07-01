import React from 'react';
import Card, {CardLink} from '../Card';

export default function Pinokio() {

    const link: CardLink = {
        link: "http://home:42000/",
        text: "Open Pinokio"
    }

    return(
        <Card
            heading="Pinokio"
            footer={link}
        >
            <>
                <p>Tool for installing AI packages</p>
                <h3>Links</h3>
                <ul>
                <li><a className="link" href="https://pinokio.computer/" target="_blank">Pinokio</a></li>
                <li><a className="link" href="https://github.com/pinokiocomputer/pinokio" target="_blank">GitHub</a></li>
                </ul>
            </>
        </Card>
    )
}