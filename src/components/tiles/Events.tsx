import React from 'react';
import Card from './Card';
import {events as evts} from '../../data/events';
import {Contact} from './Services';

type EventProps = {
    text: string,
    link: string,
    hours?: string,
    phone?: string
}

export default function Events() {
    return (
        <Card size="2">
            <h2>Events</h2>
            <React.Fragment>
                {evts.map((evt, index) => <Contact {...evt} key={index} />)}
            </React.Fragment>
        </Card>
    )
}