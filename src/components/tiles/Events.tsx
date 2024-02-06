import React from 'react';
import Card from './Card';
import {events as evts} from '../../data/events';
import {Contact} from './Services';

export default function Events(props) {
    return (
        <Card size="2">
            <h2>Events</h2>
            {evts.map((evt, index) => <Contact {...evt} key={index} />)}
        </Card>
    )
}