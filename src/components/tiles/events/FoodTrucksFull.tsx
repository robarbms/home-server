import React, { useContext, useState } from 'react';
import Card from '../Card';
import '../../../styles/events.css';
import { SiteContext } from '../../App';

const Truck = (props: any) => {
    const cleanTime = (time: string) => time.toLowerCase().replace(/:00 ?/, '').replace(/^0/, '');

    return (
        <div className="truck">
            <div>
                <strong>{props.title}</strong>
            </div>
            {cleanTime(props.start_time)} - {cleanTime(props.end_time)}
        </div>
    )
}

export const WeeklySchedule = (props: any) => {
    let { count } = props;
    count = count || 7;
    const today = new Date();
    const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateString = (date: any) => `${date.getMonth() + 1}/${date.getDate()} ${days[date.getDay()].substring(0, 3)}`;
    const dates = new Array(count).fill('').map((_, index) => new Date(today.getTime() + oneDay * index));
    const dateStrings = dates.map(dateString);

    const trucks = dates.map((date: Date) => {
        return props.trucks.filter((truck: any) => parseInt(truck.date.day) == date.getDate() && (truck.date.month === date.getMonth() + 1 || truck.date.month === months[date.getMonth()]));
    });
    
    return (
        <div className="foodtruck-week">
            <h4>{props.name}</h4>
            <table className="truck-table">
                <thead>
                    <tr>{dateStrings.map((date, index) => <th key={index}>{date}</th>)}</tr>
                    <tr>{trucks.map((trucksForDay, index) => <td key={index}>{trucksForDay.map((truck: any, idx: number) => <Truck key={idx} {...truck} />)}</td>)}</tr>
                </thead>
            </table>
        </div>
    );
}

export default function FoodTrucksFull(props: any) {
    const { events } = useContext(SiteContext);
    const [ locations, setLocations ] = useState([]);

    if (events && events.eventData && 'food' in events.eventData && locations.length === 0) {
        setLocations(events.eventData.food);
    }

    return (
        <Card
            size="2"
            heading="Food Trucks"
        >
            <>
                <div className="food-trucks">
                    {locations && locations.map((location: any, index: number) => <WeeklySchedule key={index} {...location} />)}
                </div>
            </>
        </Card>
    )
}