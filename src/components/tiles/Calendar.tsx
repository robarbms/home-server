import React, { useState, useEffect, useRef } from 'react';
import Card from '../Card';
import ReactCalendar from 'react-calendar';
import '../../styles/calendar.css';


export default function Calendar () {
    return (
        <Card size="2">
            <ReactCalendar calendarType="gregory" />
        </Card>
    )
}