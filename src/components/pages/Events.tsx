import React from 'react';
import Page, { PageProps } from './Page';
import Time from '../tiles/Time';
import Calendar from '../tiles/events/Calendar';
import Birthdays from '../tiles/events/Birthdays';
import EventsTile from '../tiles/events/Events';


export default function Events(props: PageProps) {
    return (
        <Page navigation={props.navigation}>
            <Time />
            <Calendar />
            <Birthdays />
            <EventsTile />
        </Page>
    );
}
