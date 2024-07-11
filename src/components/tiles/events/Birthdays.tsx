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

export const getBirthdays = () => {
    const now = new Date();
    const year = now.getFullYear();
    const getDate = (dt: any) => new Date(`${dt.date} ${year}`).getTime();
    const orderedBd = (bd as Array<BirthdayProps>).sort((a, b) => getDate(a) - getDate(b));

    // move dates before todays date, to the end of the list
    const idxNew = orderedBd.findIndex(bd => getDate(bd) > now.getTime());
    const updated: Array<BirthdayProps> = orderedBd.slice(idxNew).concat(orderedBd.slice(0, idxNew)).slice(0, 6) as Array<BirthdayProps>;
    const withDaysTill = updated.map((bd) => ({...bd, daysTill: Math.round((getDate(bd) - now.getTime()) / 1000 / 60 / 60 / 24)}));
    return withDaysTill;
}

export default function Birthdays() {
    const birthdays = getBirthdays();

    return (
        <Card
            heading="Birthdays"
        >
            <p>There are {birthdays[0].daysTill} days until {birthdays[0].name}'s birthday.</p>
            <p>Upcoming birthdays:</p>
            {birthdays.map((birthd: BirthdayProps, index: number) => <Birthday isFirst={index == 0} {...birthd} key={index} />) as any}
        </Card>
    )
}