import React, { useState, useEffect, useRef } from 'react';
import Card from '../Card';
import ReactCalendar from 'react-calendar';
import '../../../styles/calendar.css';
import {birthdays as bd} from '../../../data/private';
import {months} from '../Time';

export default function Calendar () {
    const dateToString = (date: Date) => `${months[date.getMonth()]} ${date.getDate()}`;
    const bdHash: { [key: string]: boolean} = {};
    bd.forEach(info => {
        bdHash[info.date] = true;
    });

    const setClass = ({date}: {date: Date}) => {
        if (bdHash[dateToString(date)]) {
            return "birday"
        }
    }
    return (
        <Card size="2" addClass="calendar_card">
            <ReactCalendar tileClassName={setClass} calendarType="gregory" />
        </Card>
    )
}