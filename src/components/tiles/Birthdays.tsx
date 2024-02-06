import React from 'react';
import Card from './Card';
import {birthdays as bd} from '../../data/private';

function Birthday(props) {
    const {name, date} = props;
    return (
        <div className={`birthday ${props.isFirst ? 'highlight' : ''}`}>
            <label>{name}: </label> {date}
        </div>
    )
}

export default function Birthdays() {
    const now = new Date();
    const year = now.getFullYear();
    const getDate = (dt) => new Date(`${dt.date} ${year}`);
    const orderedBd = bd.sort((a, b) => getDate(a) - getDate(b));

    // move dates before todays date, to the end of the list
    const idxNew = orderedBd.findIndex(bd => getDate(bd) > now);
    const updated = orderedBd.slice(idxNew).concat(orderedBd.slice(0, idxNew)).slice(0, 10);

    const timeToNext = getDate(updated[0]) - now;
    const days = Math.round(timeToNext / 1000 / 60 / 60 / 24);

    return (
        <Card>
            <h2>Birthdays</h2>
            <p>
                There are {days} days until {updated[0].name}'s birthday.
            </p>
            {updated.map((birthd, index) => <Birthday isFirst={index == 0} {...birthd} key={index} />)}
        </Card>
    )
}