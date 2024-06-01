import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ServicesPage from './Services';
import site_navigation from '../../data/navigation';
import {loadSettings} from '../navigation/Settings';
import Login from '../login/Login';

/**
 * Context used for tracking logged in state
 */
export const LoginContext = createContext({
    loggedin: false,
    setLoggedin: (val: boolean) => {}
});

/**
 * Routes to the home page if logged in, otherwise it shows the login screen
 */
export default function PageRouter() {
    const [loggedin, setLoggedin] = useState(false);

    const value = {
        loggedin,
        setLoggedin
    }

    return (loggedin ?
        <Router>
            <Routes>
                <Route path="/">
                    <Route index element={<Home navigation={site_navigation} />} />
                </Route>
            </Routes>
        </Router> :
        <LoginContext.Provider value={value}>
            <Login />
        </LoginContext.Provider>
    )
} 