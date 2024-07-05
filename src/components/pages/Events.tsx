import React, {useContext, useState } from 'react';
import Page, { PageProps } from './Page';
import Time from '../tiles/Time';
import Calendar from '../tiles/events/Calendar';
import Birthdays from '../tiles/events/Birthdays';
import Movie from  '../tiles/events/Movie';
import { SiteContext } from '../App';
import LFPTownCenter from '../tiles/events/LFPTownCenter';
import FoodTruckSchedule from '../tiles/events/FoodTruckSchedule';


export default function Events(props: PageProps) {
    const { events } = useContext(SiteContext);

    console.log(events);

    return (
        <Page navigation={props.navigation}>
            <Time />
            <Calendar />
            <Birthdays />
            {events && events.eventData && <Movie {...events.eventData.movies.find((theater: any) => theater.name === 'Cinebarre')} />}
            <LFPTownCenter />
            {events && events.eventData && events.eventData.food.map((location: any, index: number) => <FoodTruckSchedule key={index} weeks={location.name.indexOf("Hellbent") >= 0 ? 3 : 2} {...location} />)}
        </Page>
    );
}
