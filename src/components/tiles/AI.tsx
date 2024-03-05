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
            <p>Coming soon...</p>
            <h3>Image Generation</h3>
            <a href="/" className="button" target="_blank">Stable Diffusion</a>
            <a href="/other/" className="button" onClick={(e: React.MouseEvent | TargetPort) => e.target.port="8188"} target="_blank">ComfyUI</a>
            <h3>Resources</h3>
        </Card>
    )
}