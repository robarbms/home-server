import React, { useEffect, useState, useContext } from 'react';
import Card from '../Card';
import { SiteContext } from '../../App';
import '../../../styles/events.css';
import { getWeekday } from '../../utils/dates';

const LFPEvent = (props: any) => {
    const months = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

        return (
        <div className="event">
            <h4 style={{"marginTop": "10px"}}>{props.title}</h4>
            <div>{props.location}</div>
            <div>{getWeekday(props.date)}, {months[props.date.month - 1]} {props.date.day}, {props.start_time} - {props.end_time}</div>
        </div>
    )
}

export default function LFPTownCenter() {
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
                    {!!lfpEvents && lfpEvents.events.slice(0, 6).map((event: any, index: number) => <LFPEvent key={index} {...event} />)}
                </div>
            </>
        </Card>
    )
}