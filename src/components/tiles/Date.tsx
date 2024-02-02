import React, {useState, useEffect} from 'react';
import Card from './Card';

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


export default function DateTile() {
    const [date, setDate] = useState({
        weekday: "Today",
        month: "",
        day: "",
        year: ""
    });

    useEffect(() => {
        const now = new Date();
        const date_parse = {
            weekday: weekdays[now.getDay()],
            month: months[now.getMonth() - 1],
            day: now.getDate(),
            year: now.getFullYear()
        };
        setDate(date_parse);
    }, []);

    return (
        <Card>
            <div className="date_tile">
                <h2>{date.weekday}</h2>
                {date.month} {date.day}, {date.year}
            </div>
        </Card>
    )
}