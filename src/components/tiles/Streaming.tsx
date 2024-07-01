import React from 'react';
import {streaming} from '../../data/private';
import Card from './Card';
import '../../styles/streams.css';

function Stream(props: {
    service: string;
    login: string;
    password: string;
}) {
    const {service, login, password} = props;

    return (
        <div className="stream">
            <h3>{service}</h3>
            <div>
                <label>Login:</label> {login}
            </div>
            <div>
                <label>Password:</label> {password}
            </div>
        </div>
    );
}

export default function Streaming() {
    return (
        <Card
            size="2"
            heading="Streaming Services"
        >
            <div className="streams">
                {streaming.map((serv, index) => <Stream key={index} {...serv} />)}
            </div>
        </Card>
    )
}