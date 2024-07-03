import React from 'react';
import Card from '../Card';
import '../../../styles/events.css';

const MovieTime = (props: any) => {
    return (
        <div className="event-movie-time">
            {props.time}
        </div>
    )
}

export const Showing = (props: any) => {
    return (
        <div className="event-movie">
            <h4>{props.title}</h4>
            {props.times && props.times.length > 0 && props.times.map((time: any, idx: number) => <MovieTime key={idx} time={time} />)}
        </div>
    )
}

export default function Movie(props: any) {

    return (
        <Card
            size="2"
            heading={props.name}
        >
            <>
                <div className="event-movies">
                    {props.movies.map((data: any, idx: number) => <Showing key={idx} {...data} />)}
                </div>
            </>
        </Card>
    )
}