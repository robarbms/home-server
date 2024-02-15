import React, { MouseEvent, MouseEventHandler, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ServicesPage from './Services';
import site_navigation from '../../data/navigation';
import {loadSettings} from '../navigation/Settings';
import Login from '../login/Login';

export default function PageRouter() {
    const [ isDark, setIsDark ] = useState(true);
    const [loggedin, setLoggedin] = useState(false);
    const setDark: MouseEventHandler = (e: MouseEvent): boolean => {
        e.preventDefault();
        document.cookie = `isDark=${!isDark ? 'true' : 'false'}`;
        setIsDark(!isDark);
        return false;
    }

    useEffect(() => {
        const currentSettings = loadSettings();
        if (isDark != currentSettings.isDark) {
            setIsDark(currentSettings.isDark == 'true');
        }
    }, []);

    return (loggedin ?
        <Router>
            <Routes>
                <Route path="/">
                    <Route index element={<Home isDark={isDark} navigation={site_navigation} setDark={setDark} />} />
                    <Route path="services" element={<ServicesPage isDark={isDark} navigation={site_navigation} setDark={setDark} />} />
                </Route>
            </Routes>
        </Router> :
        <Login setLogin={setLoggedin} isDark={isDark} />
    )
} 