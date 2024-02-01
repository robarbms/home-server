import React, { MouseEventHandler } from 'react';
import '../styles/setDark.css';

type SetDarkProps = {
    setDark: MouseEventHandler
}

export default function SetDark(props: SetDarkProps) {
    return (
        <div>
            <h3>Dark mode</h3>
            <div className="set-dark" onClick={props.setDark}>
                <div className="dark-toggle"></div>
            </div>
        </div>
    )
}