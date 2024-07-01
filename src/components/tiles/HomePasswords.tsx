import React from 'react';
import Card from './Card';
import {passwords} from '../../data/private';
import '../../styles/home_passwords.css';

// Password line item properties
type PWItemLineProps = {
    label: string,
    value: string
}

/**
 * Rendering of a password line item
 * @param props 
 * @returns 
 */
function PWItemLine(props: PWItemLineProps) {
    const {label, value} = props;
    return (
        <div className="pw_item_entry">
            <label>{label}</label><span>{value}</span>
        </div>
    )
}

// Password entry properties
type LineItemProperties = {
    SSID?: string,
    Code?: string,
    Service?: string,
    Login?: string,
    Password?: string
}

type EntryKeys = keyof LineItemProperties;

function getItemLine(item: LineItemProperties) {
    const lineItems = [];
    let idx = 0;
    for (let key in item) {
        lineItems.push(<PWItemLine key={idx} label={key} value={(item as any)[key]} />);
        idx++;
    }
    return lineItems;
}

// Password group properties
type PWGroupProps = {
    group: string,
    items: LineItemProperties[],
}

function PWGroup(props: PWGroupProps) {
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
    const passwordElements: React.JSX.Element[] = passwords.filter(group => group.group !== "Streaming services").map((group: PWGroupProps, index: number) => <PWGroup {...group} key={index} />);
    return (
        <Card
            size="2"
            heading="Passwords"
        >
            <React.Fragment>
                {passwordElements}
            </React.Fragment>
        </Card>
    )
}