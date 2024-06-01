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
            <a href="http://home:3000" className="button" target="_blank">Ollama - WebUI</a>
            <h3>Image Generation</h3>
            <a href="/other/" className="button" onClick={(e: React.MouseEvent | TargetPort) => e.target.port="8188"} target="_blank">ComfyUI</a>
            <h3>Resources</h3>
        </Card>
    )
}