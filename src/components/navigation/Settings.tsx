import React from 'react';
import { settings } from '../../data/settings';
import SetDark from './SetDark';
import ColorPicker from './ColorPicker';
import '../../styles/settings.css';

export default function Settings(props) {
    return (
        <div className="settings">
            <h2>Settings</h2>
            <SetDark setDark={props.setDark} />
            <ColorPicker accents={settings.accents} />
        </div>
    )
}
