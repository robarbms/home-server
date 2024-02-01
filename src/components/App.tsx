import React, { MouseEvent, MouseEventHandler, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import site_navigation from '../data/navigation';
import '../styles/site.css';
import Home from './pages/Home';
import ServicesPage from './pages/Services';


/**
 * Renders the basic shell for the site.
 * @returns App component
 */
export default function App (): React.ReactElement {
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