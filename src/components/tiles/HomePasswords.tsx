import React from 'react';
import Card from './Card';
import {passwords} from '../../data/private';
import '../../styles/home_passwords.css';

function PWItemLine(props) {
    const {label, value} = props;
    return (
        <div className="pw_item_entry">
            <label>{label}</label><span>{value}</span>
        </div>
    )
}

function getItemLine(item) {
    const lineItems = [];
    let idx = 0;
    for (let key in item) {
        lineItems.push(<PWItemLine key={idx} label={key} value={item[key]} />);
        idx++;
    }
    return lineItems;
}

function PWItem(props) {
    return (
        <div className="password_item">
            {props.login_label &&
                <div className="pw_item_entry">
                    <label>{props.login_label}</label> {props.login}
                </div>
            }
            <div className="pw_item_entry">
                <label>Password</label> {props.password}
            </div>
        </div>
    )
}

function PWGroup(props) {
    return (
        <div className="password_group">
            <h3>{props.group}</h3>
            <div className="group_items">
            {props.items.map((itm, index) => (
                <div key={index} className="password_item">
                    {getItemLine(itm)}
                </div>
            ))}
            </div>
        </div>
    )
}

export default function HomePasswords() {
    return (
        <Card size="2">
            <h2>Passwords</h2>
            {passwords.map((group, index) => <PWGroup {...group} key={index} />)}
        </Card>
    )
}