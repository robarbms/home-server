import React, { useState, useEffect } from 'react';
import '../styles/site.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { clientid, valid_users } from '../data/private';
import { jwtDecode } from 'jwt-decode';
import PageRouter from './pages/PageRouter';

function login(email) {
    document.cookie = `user=${email}`;
}

/**
 * Renders the basic shell for the site.
 * @returns App component
 */
export default function App (): React.ReactElement {
    const [logedin, setLogedin] = useState(false);

    const isValidUser = (email) => !!valid_users.find(e => e === email);

    const login = (resp) => {
        const creds = jwtDecode(resp.credential);
        if (isValidUser(creds.email)) {
            setLogedin(true);
        }
        document.cookie = `user=${creds.email}`;
    }

    useEffect(() => {
        const userKeyValue = document.cookie
            .split("; ")
            .find(val => val.startsWith("user="));
        if (userKeyValue) {
            const value = userKeyValue.split("=")[1];
            if (isValidUser(value)) {
                setLogedin(true);
            }
        }
    }, []);

    return (
        <GoogleOAuthProvider clientId={clientid}>
            {!logedin &&
                <GoogleLogin
                    onSuccess={login} 
                    onError={() => {
                        console.error('Login Failed');
                    }} />
            }
            {logedin &&
                <PageRouter />
            }
        </GoogleOAuthProvider>
    )
}