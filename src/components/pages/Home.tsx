import React from 'react';
import Page, { PageProps } from './Page';
import Time from '../tiles/Time';
import Calendar from '../tiles/Calendar';
import Birthdays from '../tiles/Birthdays';
import Services from '../tiles/Services';
import Streaming from '../tiles/Streaming';


export default function Home(props: PageProps) {
    return (
        <Page isDark={props.isDark} navigation={props.navigation} setDark={props.setDark}>
            <Time></Time>
            <Calendar></Calendar>
            <Birthdays></Birthdays>
            <Services></Services>
            <Streaming></Streaming>
        </Page>
    );
}