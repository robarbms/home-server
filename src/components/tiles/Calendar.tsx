import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import ReactCalendar from 'react-calendar';
import '../../styles/calendar.css';
import {birthdays as bd} from '../../data/private';
import {months} from './Time';



export default function Calendar () {
    const dateToString = (date) => `${months[date.getMonth()]} ${date.getDate()}`;
    const bdHash = {};
    bd.forEach(info => {
        bdHash[info.date] = true;
    });

    const setClass = ({date}) => {
        if (bdHash[dateToString(date)]) {
            return "birday"
        }
    }
    return (
        <Card size="2">
            <ReactCalendar tileClassName={setClass} calendarType="gregory" />
        </Card>
    )
}