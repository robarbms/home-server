import React, {createContext, useEffect, useState, MouseEventHandler} from 'react';
import '../styles/site.css';
import PageRouter from './pages/PageRouter';
import {loadSettings} from './navigation/Settings'


/**
 * Context for dark and light themes
 * Is dark by default
 */
export const ThemeContext = createContext({
    isDark: true,
    toggleTheme: (e: React.MouseEvent) => {}
});

/**
 * Renders the basic shell for the site.
 * @returns App component
 */
export default function App (): React.ReactElement {
    const [isDark, setIsDark] = useState(true);

    // Helper function to toggle the theme between light and dark
    const toggleTheme: MouseEventHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        document.cookie = `isDark=${!isDark ? 'true' : 'false'}`;
        setIsDark(!isDark);
    }

    // State and setter to pass to the ThemeContext
    const value = {isDark, toggleTheme};

    useEffect(() => {
        const currentSettings = loadSettings();
        if (isDark.toString() != currentSettings.isDark) {
            const savedSetting = currentSettings.isDark == 'true';
            setIsDark(savedSetting);
        }
    }, []);

    return (
        <ThemeContext.Provider value={value}>
            <PageRouter />
        </ThemeContext.Provider>
    )
}