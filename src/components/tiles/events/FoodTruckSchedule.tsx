import React, { useContext, useState } from 'react';
import Card from '../Card';
import '../../../styles/events.css';

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

const DayTrucks = (props: any) => {
    return (
        <div className="day-truck">
            <div className="day-truck-date">{props.dateString}</div>
            <div className="day-truck-trucks">
                {props.trucks.map((t: any, i: number) => <Truck key={i} {...t} />)}
            </div>
        </div>
    )
}

export const WeeklySchedule = (props: any) => {
    let { weeks } = props;
    weeks = weeks || 1;
    const today = new Date();
    const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateString = (date: any) => `${days[date.getDay()].substring(0, 3)} ${date.getMonth() + 1}/${date.getDate()}`;
    const dates = new Array(weeks * 7).fill('').map((_, index) => new Date(today.getTime() + oneDay * index));
    const dateStrings = dates.map(dateString);

    const trucks = dates.map((date: Date) => {
        return props.trucks.filter((truck: any) => parseInt(truck.date.day) == date.getDate() && (truck.date.month === date.getMonth() + 1 || truck.date.month === months[date.getMonth()]));
    });
    
    return (
        <div className="foodtruck-week">
            {weeks >= 1 && 
                trucks.map((truck, index) => <DayTrucks key={index} dateString={dateStrings[index]} trucks={truck} />)
            }
        </div>
    );
}

export default function FoodTruckSchedule(props: any) {

    return (
        <Card
            size="2"
            heading={props.name}
        >
            <>
                <div className="food-trucks">
                    <h4>Food truck schedule</h4>
                    <WeeklySchedule {...props}/>
                </div>
            </>
        </Card>
    )
}