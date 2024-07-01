import React from 'react';
import Page, { PageProps } from './Page';
import Time from '../tiles/Time';
import Calendar from '../tiles/events/Calendar';
import Birthdays from '../tiles/events/Birthdays';
import Services from '../tiles/Services';
import Streaming from '../tiles/Streaming';
import HomePasswords from '../tiles/HomePasswords';
import AI from '../tiles/AI';
import Events from '../tiles/events/Events';
import { CalendarOutlined, VideoCameraOutlined, TruckOutlined, KeyOutlined, ControlOutlined } from '@ant-design/icons';


export default function Home(props: PageProps) {
    return (
        <Page navigation={props.navigation}>
            <Time />
            <Calendar />
            <AI />
            <Streaming />
            <HomePasswords />
            <Services />
        </Page>
    );
}