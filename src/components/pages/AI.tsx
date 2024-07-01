import React from 'react';
import Page, { PageProps } from './Page';
import Time from '../tiles/Time';
import OpenWebUI from '../tiles/ai/openwebui';
import ComfyUI from '../tiles/ai/compfyui';
import Pinokio from '../tiles/ai/pinokio';
import Civit from '../tiles/ai/civit';


export default function AI(props: PageProps) {
    return (
        <Page navigation={props.navigation}>
            <Time />
            <OpenWebUI />
            <ComfyUI />
            <Pinokio />
            <Civit />
        </Page>
    );
}