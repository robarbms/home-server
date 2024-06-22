import React from 'react';
import Card from './Card';

type TargetPort = {
    target: EventTarget & {
        port: string
    }
}

export default function AI() {
    return(
        <Card>
            <h2>AI Services</h2>
            <h3>Text Generation</h3>
            <a href="http://home:42421" className="button" target="_blank">Ollama - WebUI</a>
            <h3>Image Generation</h3>
            <a href="http://home:8188" className="button" target="_blank">ComfyUI</a>
            <h3>Resources</h3>
            <a href="http://home:42000" className="button" target="_blank">Pinokio</a>
        </Card>
    )
}