import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import '../../styles/setDark.css';

export default function SetDark() {
    const theme = useContext(ThemeContext);

    return (
        <div>
            <h3>Dark mode</h3>
            <div className="set-dark" onClick={theme.toggleTheme}>
                <div className="dark-toggle"></div>
            </div>
        </div>
    )
}