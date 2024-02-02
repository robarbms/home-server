import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import '../../styles/time.css';


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

type Times = {
    current?: string,
    seattle?: string,
    boston?: string,
    london?: string,
    hawaii?: string
}

type TimesKeys = keyof Times;

type TimeOptions = {
    hour: 'numeric' | '2-digit' | undefined,
    minute: 'numeric' | '2-digit' | undefined,
    hour12: boolean
}

export default function Time() {
    const [time, setTime]: [Times, (times: Times) => void] = useState({});
    const [date, setDate] = useState({});
    const timeHandle = useRef();
    const timeZones: Times = {
        current: "",
        seattle: "America/Los_Angeles",
        boston: "America/New_York",
        london: "Europe/London",
        hawaii: "Pacific/Honolulu"
    }

    const updateTimes = () => {
        const now: Date = new Date();
        const getMinutes = (mins: number): string => `${mins < 10 ? '0' : ''}${mins}`;
        const base_opts: TimeOptions = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }
        const newTime: Times = {};

        for (let key in timeZones) {
            const timeZone: string | undefined = timeZones[key as keyof Times];
            const opts = Object.assign({}, base_opts, (key === "current" ? {} : { timeZone }));
            const formatter = new Intl.DateTimeFormat([], opts);
            const time = formatter.format(now);
            if (time !== newTime["current"]) {
                newTime[key as keyof Times] = time;
            }
        }
        newTime["current"] = newTime.current?.replace(/AM|PM/i, "");

        setTime(newTime);
        if (date.day && now.getDate != date.day) {
            updateDate();
        }
    }

    const updateDate = () => {
        const now = new Date();
        const date_parse = {
            weekday: weekdays[now.getDay()],
            month: months[now.getMonth()],
            day: now.getDate(),
            year: now.getFullYear()
        };
        setDate(date_parse);
    }

    const getOtherZones = () => {
        const zones = [];
        for (let label in time) {
            if (label !== "current") {
                zones.push({
                    label,
                    time: time[label as keyof Times]
                });
            }
        }
        return zones;
    }

    useEffect(() => {
        updateTimes();
        if (timeHandle.current) {
            clearTimeout(timeHandle.current);
        }

        updateDate();

        timeHandle.current = setInterval(updateTimes, 30000) as any;
        return () => clearTimeout(timeHandle.current);
    }, []);
    
    return(
        <Card>
            <div className="time">{time.current}</div>
            <div className="date">
                <h2>{date.weekday}</h2>
                {date.month} {date.day}, {date.year}
            </div>
            {getOtherZones().map((zone, index) => {
                return (
                    <div className="time-zone" key={index}><label>{zone.label}</label> {zone.time?.toLowerCase()}</div>
                );
            })}
        </Card>
    )
}