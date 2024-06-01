import React from 'react';
import Page, { PageProps } from './Page';
import Time from '../tiles/Time';
import Calendar from '../tiles/Calendar';
import Birthdays from '../tiles/Birthdays';
import Services from '../tiles/Services';
import Streaming from '../tiles/Streaming';
import HomePasswords from '../tiles/HomePasswords';
import AI from '../tiles/AI';
import Events from '../tiles/Events';
import {ThemeContext} from '../App';


export default function Home(props: PageProps) {
    return (
        <Page navigation={props.navigation}>
            <Time></Time>
            <Calendar></Calendar>
            <Birthdays></Birthdays>
            <HomePasswords></HomePasswords>
            <Events></Events>
            <AI></AI>
            <Services></Services>
        </Page>
    );
}