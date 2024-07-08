import React, { useEffect, useState, useContext } from 'react';
import Card from '../Card';
import { SiteContext } from '../../App';
import '../../../styles/events.css';

const LFPBand = (props: any) => {
    const months = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const title = props.title.replace(/ \- [^\-]*$/, "");

        return (
        <div className="band">
            <h4>{title}</h4>
            <div>{props.genre}</div>
            <div>{months[props.date.month - 1]} {props.date.day}, {props.start_time} - {props.end_time}</div>
        </div>
    )
}

export default function LFPTownCenterMusic() {
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
            heading="Music at LFP Town Center"
            footer={lfpEvents ? {
                text: "View site",
                link: lfpEvents.url,
                target: "_blank"
            } : {}}
        >
            <>
                <div className="cols2-flex">
                    {!!lfpEvents && lfpEvents.music.slice(0, 8).map((band: any, index: number) => <LFPBand key={index} {...band} />)}
                </div>
            </>
        </Card>
    )
}