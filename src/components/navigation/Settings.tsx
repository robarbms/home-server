import React from 'react';
import { settings } from '../../data/settings';
import SetDark from './SetDark';
import ColorPicker from './ColorPicker';
import '../../styles/settings.css';
import {getCookie} from '../utils/cookies';

export function loadSettings() {
    const defaults = {
        isDark: true,
        accent: settings.accents[0].value
    }

    const cookies = getCookie();

    for(let key in defaults) {
        if (key in cookies) {
            defaults[key] = cookies[key];
        }
    }

    return defaults;
}

export default function Settings(props) {
    return (
        <div className="settings nav-section">
            <h2>Settings</h2>
            <SetDark setDark={props.setDark} />
            <ColorPicker accents={settings.accents} />
        </div>
    )
}
