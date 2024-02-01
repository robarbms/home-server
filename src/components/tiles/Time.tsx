import React, { useState, useEffect, useRef } from 'react';
import Card from '../Card';
import '../../styles/time.css';

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

        timeHandle.current = setInterval(updateTimes, 30000) as any;
    }, []);
    
    return(
        <Card>
            <div className="time">{time.current}</div>
            {getOtherZones().map((zone, index) => {
                return (
                    <div className="time-zone" key={index}><label>{zone.label}</label> {zone.time?.toLowerCase()}</div>
                );
            })}
        </Card>
    )
}