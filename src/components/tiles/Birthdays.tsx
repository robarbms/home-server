import React from 'react';
import Card from './Card';
import {birthdays as bd} from '../../data/private';

function Birthday(props) {
    const {name, date} = props;
    return (
        <div className="birthday">
            <label>{name}: </label> {date}
        </div>
    )
}

export default function Birthdays() {
    return (
        <Card>
            <h2>Birthdays</h2>
            {bd && bd.map((birthd, index) => <Birthday {...birthd} key={index} />)}
        </Card>
    )
}