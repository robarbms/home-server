import React from 'react';
import { settings } from '../../data/settings';
import SetDark from './SetDark';
import ColorPicker from './ColorPicker';
import '../../styles/settings.css';
import {getCookie} from '../utils/cookies';

export function loadSettings() {
    const defaults: {
        isDark: string,
        accent: string
    } = {
        isDark: 'true',
        accent: settings.accents[0].value
    }

    const cookies = getCookie();

    const merged_settings = Object.assign({}, defaults, cookies);

    return merged_settings;
}

export default function Settings() {
    return (
        <div className="settings nav-section">
            <h2>Settings</h2>
            <SetDark />
            <ColorPicker accents={settings.accents} />
        </div>
    )
}
