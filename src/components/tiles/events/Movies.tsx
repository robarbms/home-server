import React, { useEffect, useContext } from 'react';
import Card from '../Card';
import { SiteContext } from '../../App';
import '../../../styles/events.css';

const MovieTime = (props: any) => {
    return (
        <div className="event-movie-time">
            {props.time}
        </div>
    )
}

const Movie = (props: any) => {
    return (
        <div className="event-movie">
            <strong>{props.title}</strong>
            {false && props.times && props.times.length > 0 && props.times.map((time: any, idx: number) => <MovieTime key={idx} time={time} />)}
        </div>
    )
}

const Theater = (props: any) => {

    return (
        <div className="event-theater">
            <h2>{props.name}</h2>
            <div className="event-movies">
                {props.movies && props.movies.map((movie: any, index: number) => <Movie key={index} {...movie}/>)}
            </div>
        </div>
    )
}

export default function Movies() {
    const { events, navigation } = useContext(SiteContext);

    return (
        <Card
            size="2"
            heading="Movies"
            footer={{
                text: "See movie times",
                click: () => navigation.setPage("events")
            }}
        >
            <>
                <div className="cols2" style={{"height": "220px"}}>
                    {events && 'eventData' in events && !!events.eventData && 'movies' in events.eventData && events.eventData.movies.length > 0 && events.eventData.movies.map((data: any, idx: number) => <Theater key={idx} {...data} />)}
                </div>
            </>
        </Card>
    )
}