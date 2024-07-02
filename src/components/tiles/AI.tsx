import React, { useContext } from 'react';
import Card from './Card';
import { SiteContext } from '../App';

export default function AI() {
    const settings = useContext(SiteContext);
    const footerLink = {
        text: "AI Page",
        click: () => {
            settings.navigation.setPage("ai")
        }
    }
    return(
        <Card
            heading="AI Services"
            footer={footerLink}
        >
            <h3>Text Generation</h3>
            <a href="http://home:42421" className="button" target="_blank">Open WebUI</a>
            <h3>Image Generation</h3>
            <a href="http://home:42424" className="button" target="_blank">Fooocus</a>
        </Card>
    )
}