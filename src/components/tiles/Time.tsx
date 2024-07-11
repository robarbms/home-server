import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import '../../styles/time.css';
import WorldLogo from './WorldLogo';

// Helper list containing the names of the weekdays
export const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

// Helper list containing the names of the months
export const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// Properties for the times list
export type Times = {
    current?: string,
    seattle?: string,
    boston?: string,
    london?: string,
    hawaii?: string
}

// Keys used in the Times type
export type TimesKeys = keyof Times;

// Properties used for the TimeZone component
export type TimeZoneProps = {
    label: string,
    time?: string
}

// Properties used by the date object
export type DateProps = {
    weekday: string,
    day: number,
    month: string,
    year: number
}

/**
 * Rendering of a time zone with label and the current time
 * @param props 
 * @returns 
 */
export function TimeZone(props: TimeZoneProps) {
    const {label, time} = props;
    const capitolize = (str: string) => str.substr(0, 1).toUpperCase() + str.substr(1);

    return (
        <div className="time-zone">
            <h3>{capitolize(label)}</h3>
            <div className="time-zone-info">
                {time ? capitolize(time.toLowerCase()) : ""}
            </div>
        </div>
    )
}

export const updateDate = (setDate: Function) => {
    const now = new Date();
    const date_parse: DateProps = {
        weekday: weekdays[now.getDay()],
        month: months[now.getMonth()],
        day: now.getDate(),
        year: now.getFullYear()
    };
    setDate(date_parse);
}

export function updateTimes(timeZones: any, setTime: Function, date: any, setDate: Function) {
    const now: Date = new Date();
    const base_opts: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }

    const date_opts = {
        weekday: "short",
    }

    const newTime: Times = {};

    for (let key in timeZones) {
        if (key == "seattle") continue;
        const timeZone: string | undefined = timeZones[key as keyof Times];
        const opts = Object.assign({}, base_opts, (key === "current" ? {} : Object.assign({}, date_opts, { timeZone })));
        const formatter = new Intl.DateTimeFormat([], opts);
        const time = formatter.format(now);
        if (time !== newTime["current"]) {
            newTime[key as keyof Times] = time;
        }
    }
    newTime["current"] = newTime.current?.replace(/AM|PM/i, "");

    setTime(newTime);
    if (date && date.day && now.getDate() != date.day) {
        updateDate(setDate);
    }
}

export const timeZones: Times = {
    current: "",
    seattle: "America/Los_Angeles",
    boston: "America/New_York",
    // london: "Europe/London",
    hawaii: "Pacific/Honolulu"
}


/**
 * Rendering for the Time card
 * @returns 
 */
export default function Time() {
    const [time, setTime]: [Times | undefined, (times: Times) => void] = useState();
    const [date, setDate]: [DateProps | undefined, (date: DateProps) => void] = useState();
    const timeHandle = useRef();

    const getOtherZones = (): TimeZoneProps[] => {
        const zones = [];
        for (let label in time) {
            if (label !== "current") {
                zones.push({
                    label,
                    time: time[label as keyof Times]
                } as TimeZoneProps);
            }
        }
        return zones;
    }

    useEffect(() => {
        const timeUpdater = () => updateTimes(timeZones, setTime, date, setDate);
        timeUpdater();
        if (timeHandle.current) {
            clearTimeout(timeHandle.current);
        }

        timeHandle.current = setInterval(timeUpdater, 30000) as any;
        return () => clearTimeout(timeHandle.current);
    }, []);
    
    return(
        <Card addClass="time-card">
            <div className="time">{time && time.current}</div>
            <div className="date">
                <h2>{date && date.weekday}</h2>
                {date && date.month} {date && date.day}, {date && date.year}
            </div>
            <React.Fragment>
                {getOtherZones().map((zone: TimeZoneProps, index: number) => {
                    return (
                        <TimeZone key={index} {...zone} />
                    );
                })}
            </React.Fragment>
        </Card>
    )
}