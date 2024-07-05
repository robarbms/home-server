import React, { useContext, useEffect, useState } from 'react';
import Page, { PageProps } from './Page';
import Time from '../tiles/Time';
import Calendar from '../tiles/events/Calendar';
import Movie from '../tiles/events/Movie';
import { SiteContext } from '../App';
import FoodTrucks from '../tiles/events/FoodTrucks';
import AI from '../tiles/AI';
import Birthdays from '../tiles/events/Birthdays';
import LFPTownCenter from '../tiles/events/LFPTownCenter';
import Movies from '../tiles/events/Movies';


export default function Dashboard(props: PageProps) {
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
            <Movies />
            <FoodTrucks />
            <AI />
            <LFPTownCenter />
        </Page>
    );
}