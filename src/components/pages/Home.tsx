import React from 'react';
import Page, { PageProps } from './Page';
import Calendar from '../tiles/events/Calendar';
import Services from '../tiles/Services';
import Streaming from '../tiles/Streaming';
import HomePasswords from '../tiles/HomePasswords';
import Birthdays from '../tiles/events/Birthdays';


export default function Home(props: PageProps) {
    return (
        <Page navigation={props.navigation}>
            <Birthdays />
            <Streaming />
            <HomePasswords />
            <Services />
        </Page>
    );
}