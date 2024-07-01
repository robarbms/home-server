import React from 'react';
import Page, { PageProps } from './Page';

export default function Frame(props: PageProps & {url: string}) {
    return (
        <Page navigation={props.navigation} full={true}>
            <iframe className="frame" src={props.url} name="frame"></iframe>
        </Page>
    );
}