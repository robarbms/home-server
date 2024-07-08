import React, { useEffect, useState, useContext } from 'react';
import Card from './Card';
import { SiteContext } from '../App';
import '../../styles/events.css';

const LFPEvent = (props: any) => {
    const months = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const now = new Date();
    const isToday = props.date.year == now.getFullYear() && props.date.month === (now.getMonth() + 1) && parseInt(props.date.day) == now.getDate();

        return (
        <div className={`event ${isToday ? "today" : ""}`}>
            <h4>{props.title}</h4>
            <div>{props.location}</div>
            <div className="event-date">{months[props.date.month - 1]} {props.date.day}, {props.start_time} - {props.end_time}</div>
        </div>
    )
}

const LFPBand = (props: any) => {
    const months = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const title = props.title.replace(/ \- [^\-]*$/, "");
    const now = new Date();
    const isToday = props.date.year == now.getFullYear() && props.date.month === (now.getMonth() + 1) && parseInt(props.date.day) == now.getDate();

        return (
        <div className={`band ${isToday ? "today" : ""}`}>
            <h4>{title}</h4>
            <div>{props.genre}</div>
            <div className="event-date">{months[props.date.month - 1]} {props.date.day}, {props.start_time} - {props.end_time}</div>
        </div>
    )
}

export default function TownCenter() {
    const { events } = useContext(SiteContext);
    const [ lfpEvents, setLfpEvents ] = useState<any>();

    if (events && events.eventData && !lfpEvents){
        const lfptc = events.eventData.events.find((location: any) => {
            return location.name.indexOf("Town Center") >= 0;
        });
        setLfpEvents(lfptc);
    }

    return (
        <Card
            size="2"
            heading={lfpEvents ? lfpEvents.name : ""}
            footer={lfpEvents ? {
                text: "View site",
                link: lfpEvents.url,
                target: "_blank"
            } : {}}
        >
            <>
                <div className="cols2-flex">
                    {!!lfpEvents && lfpEvents.events.slice(0, 4).map((event: any, index: number) => <LFPEvent key={index} {...event} />)}
                    {!!lfpEvents && lfpEvents.music.slice(0, 2).map((event: any, index: number) => <LFPBand key={index} {...event} />)}
                </div>
            </>
        </Card>
    )
}