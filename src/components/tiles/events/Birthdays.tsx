import React from 'react';
import Card from '../Card';
import {birthdays as bd} from '../../../data/private';

type BirthdayProps = {
    name: string;
    date: string;
    isFirst?: boolean;
}

function Birthday(props: BirthdayProps) {
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
    const getDate = (dt: any) => new Date(`${dt.date} ${year}`).getTime();
    const orderedBd = (bd as Array<BirthdayProps>).sort((a, b) => getDate(a) - getDate(b));

    // move dates before todays date, to the end of the list
    const idxNew = orderedBd.findIndex(bd => getDate(bd) > now.getTime());
    const updated: Array<BirthdayProps> = orderedBd.slice(idxNew).concat(orderedBd.slice(0, idxNew)).slice(0, 6) as Array<BirthdayProps>;

    const timeToNext = getDate(updated[0]) - now.getTime();
    const days = Math.round(timeToNext / 1000 / 60 / 60 / 24);

    return (
        <Card
            heading="Birthdays"
        >
            <p>There are {days} days until {updated[0].name}'s birthday.</p>
            <p>Upcoming birthdays:</p>
            {updated.map((birthd: BirthdayProps, index: number) => <Birthday isFirst={index == 0} {...birthd} key={index} />) as any}
        </Card>
    )
}