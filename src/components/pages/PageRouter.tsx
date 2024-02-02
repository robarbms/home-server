import React, { MouseEvent, MouseEventHandler, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ServicesPage from './Services';
import Navigation from '../navigation/Navigation';
import site_navigation from '../../data/navigation';

export default function PageRouter() {
    const [ isDark, setIsDark ] = useState(true);
    const setDark: MouseEventHandler = (e: MouseEvent): boolean => {
        e.preventDefault();
        setIsDark(!isDark);
        return false;
    }

    return (
        <Router>
            <Routes>
                <Route path="/">
                    <Route index element={<Home isDark={isDark} navigation={site_navigation} setDark={setDark} />} />
                    <Route path="services" element={<ServicesPage isDark={isDark} navigation={site_navigation} setDark={setDark} />} />
                </Route>
            </Routes>
        </Router>
    )
} 