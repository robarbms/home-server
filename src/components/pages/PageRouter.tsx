import React, { useState, createContext, useEffect, useContext } from 'react';
import Home from './Home';
import site_navigation from '../../data/navigation';
import Login from '../login/Login';
import AI from './AI';
import Events from './Events';
import { SiteContext } from '../App';
import Frame from './Frame';

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
    const settings = useContext(SiteContext);
    const { page, setPage, frame } = settings.navigation;


    return settings.user.loggedIn ?
        <>
            {page === "home" && <Home navigation={site_navigation} />}
            {page === "ai" && <AI navigation={site_navigation} />}
            {page === "events" && <Events navigation={site_navigation} />}
            {page === "frame" && frame && <Frame url={frame as string} navigation={site_navigation} />}
        </> :
        <Login />
} 