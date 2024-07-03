import React, {useContext, useState } from 'react';
import Page, { PageProps } from './Page';
import Time from '../tiles/Time';
import Calendar from '../tiles/events/Calendar';
import Birthdays from '../tiles/events/Birthdays';
import EventsTile from '../tiles/events/Events';
import FoodTrucks from '../tiles/events/FoodTrucks';
import Movie from  '../tiles/events/Movie';
import  { SiteContext } from '../App';


export default function Events(props: PageProps) {
    const [ cinebarre, setCinebarre ] = useState<any>();
    const { events } = useContext(SiteContext);

    if (events && events.eventData && events.eventData.movies && !cinebarre) {
        const theaterData = events.eventData.movies.find((theater: any) => theater.name === 'Cinebarre');
        setCinebarre(theaterData);
    }

    return (
        <Page navigation={props.navigation}>
            <Time />
            <Calendar />
            <Birthdays />
            <EventsTile />
            {cinebarre && <Movie {...cinebarre} />}
            <FoodTrucks />
        </Page>
    );
}
