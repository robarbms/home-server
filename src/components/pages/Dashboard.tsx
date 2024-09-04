import React, { useContext, useEffect, useState, useRef, createRef } from 'react';
import Page, { PageProps } from './Page';
import { SiteContext } from '../App';
import '../../styles/dashboard.css';
import Time, { updateTimes, timeZones, weekdays, months } from '../tiles/Time';
import { getBirthdays } from '../tiles/events/Birthdays';
import { CakeIcon } from '@heroicons/react/24/outline';
import { Input } from 'antd';

// Alternate time zones
const AltTime = (props: {name: string, time: string}) => {

    return (
        <div className="alt-time">
            <label>{props.name}</label>
            <span>{props.time}</span>
        </div>
    );
}

// An event rendering
const Event = (props: any) => {

    return (
    <div className="dashboard-event">
        <div className="dash-event-title">
            {props.name || props.title}
        </div>
        <div className="dash-event-venue">{props.venue}</div>
        <div className="dash-event-time">
            {props.time && props.time}
            {props.start_time &&
                `${props.start_time} - ${props.end_time}`
            }
        </div>
    </div>
    );
}

// Dashboard component
export default function Dashboard(props: PageProps) {
    const data = useContext(SiteContext);
    const [ time, setTime ] = useState<any>();
    const [ date, setDate ] = useState(new Date());
    const timeHandle = useRef();
    const birthdays = getBirthdays();
    const [ events, setEvents ] = useState<any>();
    const [ weather, setWeather ] = useState<any>();
    const now = new Date();
    const searchForm = useRef() as React.MutableRefObject<HTMLFormElement> | null;

    // Handles web searches for the search form
    const webSearch = () => {
        if (searchForm) {
            searchForm.current.submit();
        }
    }

    // Updates the times for all time zones every 30 seconds
    useEffect(() => {
        const timeUpdater = () => updateTimes(timeZones, setTime, date, setDate);
        timeUpdater();
        if (timeHandle.current) {
            clearTimeout(timeHandle.current);
        }

        timeHandle.current = setInterval(timeUpdater, 30000) as any;
        return () => clearTimeout(timeHandle.current);
    }, []);

    // Parses events weather from the data object when ever it is updated
    useEffect(() => {
        if (!events && data && data.events && data.events.eventData) {
            const todaysEvents: any[] = [];
            const upcomingEvents: any[] = [];
            const tomorrow = new Date(now.getTime() + 1000 * 60 * 60 * 24);
            const isToday = (eventDate: Date) => eventDate.getFullYear() === now.getFullYear() && eventDate.getMonth() === now.getMonth() && eventDate.getDate() === now.getDate();
            const isTomorrow = (eventDate: Date) => eventDate.getFullYear() === tomorrow.getFullYear() && eventDate.getMonth() === tomorrow.getMonth() && eventDate.getDate() === tomorrow.getDate();
            // Parsing events at local venues
            data.events.eventData.events.forEach((venue: any) => {
                venue.events.forEach((event: any) => {
                    let eventDate = new Date(event.date);
                    event.venue = venue.name || venue.title;
                    event.type = 'Event';
                    if (typeof event.date !== 'string' && event.date.day) {
                        eventDate = new Date(`${event.date.month}/${event.date.day}/${event.date.year}`);
                    }
                    if (isToday(eventDate)) {
                        todaysEvents.push(event);
                    }
                    else if (isTomorrow(eventDate)) {
                        upcomingEvents.push(event);
                    }
                });
                if (venue.music) {
                    venue.music.forEach((band: any) => {
                        const eventDate = new Date(`${band.date.month}/${band.date.day}/${band.date.year}`);
                        band.venue = venue.name;
                        band.type = 'Music';
                        if (isToday(eventDate)) {
                            todaysEvents.push(band);
                        }
                        else if (isTomorrow(eventDate)) {
                            upcomingEvents.push(band);
                        }
                    });
                }
            });
            // Parses local food trucks
            data.events.eventData.food.forEach((venue: any) => {
                venue.trucks.forEach((truck: any) => {
                    truck.venue = venue.name;
                    truck.type = 'Food';
                    const truckDate = new Date(`${truck.date.month}/${truck.date.day}/${truck.date.year}`);
                    if (isToday(truckDate)) {
                        todaysEvents.push(truck);
                    }
                    else if (isTomorrow(truckDate)) {
                        upcomingEvents.push(truck);
                    }
                });
            });
            const movies: any[] = [];
            // Parses movies playing at local theaters
            data.events.eventData.movies.forEach((theater: any) => {
                theater.movies.forEach((movie: any) => {
                    movies.push({
                        title: movie.title,
                        time: movie.times.join(", "),
                        venue: theater.name,
                    });
                });
            });
            setEvents({todaysEvents, upcomingEvents, movies});

            // Parses weather data
            const wd = data.weather.weatherData;
            console.log({data, wd});
            setWeather({
                temperature: wd?.main?.temp,
                min: wd?.main?.temp_min,
                max: wd?.main?.temp_max,
                conditions: wd?.weather[0]?.main,
                humidity: wd?.main?.humidity,
            });
        }
    }, [data]);

    return (
        <Page className="dashboard" navigation={props.navigation}>
            <div className="dashboard-content">
                <div className="dashboard-upper">

                </div>
                <div className="dashboard-middle">
                    <div className="dashboard-time">
                        {time && 
                            <>
                                <div className="current-time">{time.current}</div>
                                {date &&
                                   <div className="current-date">{weekdays[date.getDay()]} {months[date.getMonth()]} {date.getDate()}</div>

                                }
                                {weather &&
                                    <div className="weather">
                                        {weather.conditions} - {weather.temperature}°F
                                    </div>
                                }
                                <div className="alt-times">
                                    <AltTime name="Boston" time={time.boston} />
                                    <AltTime name="Hawaii" time={time.hawaii} />
                                </div>
                            </>
                        }
                        <div className="dash-search">
                            <form action="http://home:42003/search" method="GET" target="_blank" rel="noopener noreferrer" ref={searchForm}>
                                <Input.Search className="dash-search-input" placeholder='Web search' name="q" allowClear onSearch={webSearch} />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="dashboard-lower">
                    <section>
                        <h2>Todays Events</h2>
                        {events && events.todaysEvents &&
                            events.todaysEvents.map((event: any, index: number) => <Event {...event} key={index} />)
                        }
                    </section>
                    <section>
                    <h2>Movies</h2>
                        {events && events.movies &&
                            events.movies.map((event: any, index: number) => <Event {...event} key={index} />)
                        }
                    </section>
                    <section>
                        <h2>Upcoming Events</h2>
                        {birthdays &&
                          <div className="dashboard-birthday">
                            <CakeIcon className="dash-icon" /> {birthdays[0].name}'s birthday in {birthdays[0].daysTill} days.
                          </div>
                        }
                        {events && events.upcomingEvents &&
                            events.upcomingEvents.map((event: any, index: number) => <Event {...event} key={index} />)
                        }
                    </section>
                </div>
            </div>
        </Page>
    );
}