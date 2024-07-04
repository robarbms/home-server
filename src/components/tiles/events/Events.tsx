import React from 'react';
import Card from '../Card';
import {events as evts} from '../../../data/events';
import {Contact} from '../Services';

export default function Events() {
    return (
        <Card
            size="2"
            heading="Local Event Info"
        >
            {evts.map((evt, index) => <Contact {...evt} key={index} />)}
        </Card>
    )
}