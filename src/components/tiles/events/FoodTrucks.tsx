import React, { useContext, useState } from 'react';
import Card from '../Card';
import '../../../styles/events.css';
import { SiteContext } from '../../App';

const Truck = (props: any) => {
    const cleanTime = (time: string) => time.toLowerCase().replace(/:00 ?/, '').replace(/^0/, '');

    return (
        <div className="truck">
            <strong>{props.title}</strong> {cleanTime(props.start_time)} - {cleanTime(props.end_time)}
        </div>
    )
}

const Location = (props: any) => {
    const today = new Date();
    const  tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1 );

    const trucksToday = props.trucks.filter((truck: any) => {
        return truck.date.day == today.getDate();
    });
    const trucksTomorrow = props.trucks.filter((truck: any) => { 
        return truck.date.day == tomorrow.getDate();
    });

    return (
        <div className="food-location">
            <h2>{props.name}</h2>
            <div>
                <label>Today:</label>
                {trucksToday.length > 0 &&
                    trucksToday.map((truck: any, index: number) => <Truck key={index} {...truck} />)
                }
                {trucksToday.length === 0 &&
                    <>No food trucks today.</>
                }
            </div>
            <div>
                <label>Tomorrow:</label>
                {trucksTomorrow.length > 0 &&
                    trucksTomorrow.map((truck: any, index: number) => <Truck key={index} {...truck} />)
                }
                {trucksTomorrow.length === 0 &&
                        <>No food trucks tomorrow.</>
                }
            </div>
        </div>
    )
}

export default function FoodTrucks(props: any) {
    const { events, navigation } = useContext(SiteContext);
    const [ locations, setLocations ] = useState([]);

    if (events && events.eventData && 'food' in events.eventData && locations.length === 0) {
        setLocations(events.eventData.food);
    }

    return (
        <Card
            heading="Food Trucks"
            footer={{
                text: "See weekly schedule",
                click: () => navigation.setPage('events')
            }}
        >
            <>
                <div className="food-trucks">
                    {locations && locations.map((location: any, index: number) => <Location key={index} {...location} />)}
                </div>
            </>
        </Card>
    )
}