import React, {createContext, useEffect, useState, MouseEventHandler} from 'react';
import '../styles/site.css';
import PageRouter from './pages/PageRouter';
import { getCookie } from './utils/cookies';

export type PageRoute = "home" | "ai" | "frame" | "events";

interface IContext {
    user: {
        loggedIn: boolean;
        setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
        userName: string;
        setUserName: React.Dispatch<React.SetStateAction<string>>;
    };
    theme: {
        isDark: boolean;
        setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
        primaryColor: string;
        setPrimaryColor: React.Dispatch<React.SetStateAction<string>>;
    },
    navigation: {
        page: PageRoute;
        setPage: React.Dispatch<React.SetStateAction<PageRoute>>;
        loadFrame: (url: string) => void;
        frame: null | string;
        setFrame: React.Dispatch<React.SetStateAction<null | string>>;
    }
}

/**
 * Context for dark and light themes
 * Is dark by default
 */
export const SiteContext = createContext<IContext>({
    user: {
        loggedIn: false,
        setLoggedIn: ((value: boolean) => {}) as React.Dispatch<React.SetStateAction<boolean>>,
        userName: "",
        setUserName: ((value: string) => {}) as React.Dispatch<React.SetStateAction<string>>,
    },
    theme: {
        isDark: false,
        setIsDark: ((value: boolean) => {}) as React.Dispatch<React.SetStateAction<boolean>>,
        primaryColor: "#2499FF",
        setPrimaryColor: ((value: string) => {}) as React.Dispatch<React.SetStateAction<string>>
    },
    navigation: {
        page: "home",
        setPage: ((value: string) => {}) as React.Dispatch<React.SetStateAction<PageRoute>>,
        loadFrame: (url: string) => {},
        frame: null,
        setFrame: ((url: string) => {}) as React.Dispatch<React.SetStateAction<null | string>>,
    },
});


/**
 * Renders the basic shell for the site.
 * @returns App component
 */
export default function App (): React.ReactElement {
    const [ primaryColor, _setPrimaryColor ] = useState<string>('#2499FF');
    const [isDark, _setIsDark] = useState<boolean>(false);
    const [ page, setPage] = useState<PageRoute>("home");
    const [ loggedIn, setLoggedIn ] = useState<boolean>(false);
    const [ userName, setUserName] = useState<string>("");
    const [ frame, setFrame ] = useState<string | null>(null);

    const setIsDark: React.Dispatch<React.SetStateAction<boolean>> = ((value: boolean) => {
        document.cookie = `isDark=${value ? 'true' : 'false'}`;
        _setIsDark(value);
    }) as React.Dispatch<React.SetStateAction<boolean>>;

    const setPrimaryColor: React.Dispatch<React.SetStateAction<string>> = ((value: string) => {
        document.querySelector('body')?.style.setProperty('--accent', value);
        document.cookie = `accent=${value}`;
        _setPrimaryColor(value);
    }) as React.Dispatch<React.SetStateAction<string>>;

    // State and setter to pass to the SiteContext
    const value: IContext = {
        user: {
            loggedIn,
            setLoggedIn,
            userName,
            setUserName,
        },
        theme: {
            isDark,
            setIsDark,
            primaryColor,
            setPrimaryColor,
        },
        navigation: {
            page,
            setPage,
            loadFrame: (url: string) => {
                setFrame(url);
                setPage("frame");
            },
            frame,
            setFrame
        }
    };


    useEffect(() => {
        const cookies = getCookie();
        if (cookies) {
            _setIsDark(cookies.isDark === 'true');
            document.querySelector('body')?.style.setProperty('--accent', cookies.accent as any);
            _setPrimaryColor(cookies.accent as any);
        }
    }, []);

    return (
        <SiteContext.Provider value={value as IContext}>
            <PageRouter />
        </SiteContext.Provider>
    )
}