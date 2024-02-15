import React, { useState, useEffect, useRef } from 'react';
import {logins} from '../../data/private';
import '../../styles/login.css';

/**
 * Simple login component
 * @param props {isDark: boolean, setLogin: (login: boolean) => void}
 * @returns 
 */
export default function Login(props) {
    const code1Cell = useRef(null);
    const code2Cell = useRef(null);
    const code3Cell = useRef(null);
    const code4Cell = useRef(null);

    /* Helper method to combine all of the passcode digits into a single passcode */
    const getPassword = () => `${code1Cell?.current?.value}${code2Cell?.current?.value}${code3Cell?.current?.value}${code4Cell?.current?.value}`;

    /* Checks to see if the entered passcode is in a list of accepted passcodes */
    const validPW = (pass: string): boolean => !!logins.find(pw => pw === pass);

    /* Clears all the passcode fields and sets focus into the first number field */
    const clearPassword = () => {
        code1Cell?.current?.value = "";
        code2Cell?.current?.value = "";
        code3Cell?.current?.value = "";
        code4Cell?.current?.value = "";
        code1Cell?.current?.focus();
    }

    /**
     * Checks that the passwcode is correct and writes it to a cookie
     */
    const validatePassword = () => {
        const password = getPassword();
        if (validPW(password)) {
            document.cookie = `password=${password}`;
            props.setLogin(validPW(password));
        }
        else {
            clearPassword();
        }
    }

    /**
     * 
     * @param cellNumber Number of the current cell being entered
     * @returns An event handler for the keyup event
     */
    const handleKeyUp = (cellNumber: int) => {
        return (event) => {
            switch(cellNumber) {
                case 1:
                    code2Cell?.current?.focus();
                    break;
                case 2:
                    code3Cell?.current?.focus();
                    break;
                case 3:
                    code4Cell?.current?.focus();
                    break;
                default:
                    validatePassword();
            }
            return false;
        }
    }


    /**
     * Checks if there is a passcode stored in the cookie first before forcing login
     */
    useEffect(() => {
        const userKeyValue = document.cookie
            .split("; ")
            .find(val => val.startsWith("password="));
        if (userKeyValue) {
            const value = userKeyValue.split("=")[1];
            if (validPW(value)) {
                props.setLogin(true);
                return;
            }
        }
        code1Cell?.current?.focus();
    }, []);

    return (
        <div className={`login ${props.isDark ? 'dark' : ''}`}>
            <div className="login_area">
                <input type="number" ref={code1Cell} onKeyUp={handleKeyUp(1)} />
                <input type="number" ref={code2Cell} onKeyUp={handleKeyUp(2)} />
                <input type="number" ref={code3Cell} onKeyUp={handleKeyUp(3)} />
                <input type="number" ref={code4Cell} onKeyUp={handleKeyUp(4)} />
            </div>
        </div>
    )
}