import React, { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../App';
import {logins} from '../../data/private';
import '../../styles/login.css';
import { LoginContext } from '../pages/PageRouter';

/**
 * Simple login component
 * @param props {isDark: boolean, setLogin: (login: boolean) => void}
 * @returns 
 */
export default function Login() {
    const cells = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];
    const code1Cell = useRef(null);
    const code2Cell = useRef(null);
    const code3Cell = useRef(null);
    const code4Cell = useRef(null);

    /* Helper method to combine all of the passcode digits into a single passcode */
    const getPassword = () => cells.reduce((pass: string, cell: React.MutableRefObject<null|HTMLInputElement>) => {
        if (cell && cell.current && cell.current.value) pass += cell.current.value;
        return pass;
    }, "");

    /* Checks to see if the entered passcode is in a list of accepted passcodes */
    const validPW = (pass: string): boolean => !!logins.find(pw => pw === pass);

    const setCodeCell = (cell: React.MutableRefObject<null|HTMLInputElement>, value: string) => {
        if (cell && cell.current && cell.current.value) cell.current.value = value;
    }

    const focusFirstCell = () => {
        const firstCell: React.MutableRefObject<null|HTMLInputElement> = cells[0];
        if (firstCell && firstCell.current) firstCell.current.focus();
    }

    /* Clears all the passcode fields and sets focus into the first number field */
    const clearPassword = () => {
        [code1Cell, code2Cell, code3Cell, code4Cell].forEach(cell => setCodeCell(cell, ""));
        focusFirstCell();
    }

    /**
     * Checks that the passwcode is correct and writes it to a cookie
     */
    const validatePassword = () => {
        const password = getPassword();
        if (validPW(password)) {
            document.cookie = `password=${password}`;
            login.setLoggedin(validPW(password));
        }
        else {
            clearPassword();
        }
    }

    const login = useContext(LoginContext);

    /**
     * 
     * @param cellNumber Number of the current cell being entered
     * @returns An event handler for the keyup event
     */
    const handleKeyUp = (cellNumber: number) => {
        return () => {
            if (cellNumber < 4) {
                const cell: React.MutableRefObject<null|HTMLInputElement> = cells[cellNumber];
                if (cell && cell.current) cell.current.focus(); 
            }
            else {
                validatePassword();
            }
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
                login.setLoggedin(true);
                return;
            }
        }
        focusFirstCell();
    }, []);

    const theme = useContext(ThemeContext);

    return (
        <div className={`login ${theme.isDark ? 'dark' : ''}`}>
            <div className="login_area">
                <input type="number" ref={cells[0]} onKeyUp={handleKeyUp(1)} />
                <input type="number" ref={cells[1]} onKeyUp={handleKeyUp(2)} />
                <input type="number" ref={cells[2]} onKeyUp={handleKeyUp(3)} />
                <input type="number" ref={cells[3]} onKeyUp={handleKeyUp(4)} />
            </div>
        </div>
    )
}