import React, {useState, useEffect} from 'react';
import {getCookie} from '../utils/cookies';

export function setAccent(color) {
    document.querySelector('body')?.style.setProperty('--accent', color);
    document.cookie = `accent=${color}`;
}

function ColorOption(props) {
    const {name, setColor} = props;

    return (
        <div className="color_option" onClick={() => setColor(props.value)}>
            <div className="swatch" style={{backgroundColor: props.value}}>

            </div>
            <label>{name}</label>
        </div>
    )
}

export default function ColorPicker(props) {
    const [color, setColor] = useState();

    useEffect(() => {
        if (color) {
            setAccent(color);
        }
    }, [color]);

    useEffect(() => {
        const cookie = getCookie();
        if (cookie.accent) {
            setColor(cookie.accent);
        }
    }, []);

    return (
        <div className="color_picker">
            <h3>Accent color</h3>
            {props.accents.map((clr, index) => <ColorOption {...clr} key={index} setColor={setColor} />)}
        </div>
    )
}