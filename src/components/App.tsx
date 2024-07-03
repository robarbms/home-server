import React, {createContext, useEffect, useState, MouseEventHandler , useCallback} from 'react';
import '../styles/site.css';
import PageRouter from './pages/PageRouter';
import { getCookie } from './utils/cookies';

export type PageRoute = "dashboard" | "home" | "ai" | "frame" | "events";

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
    },
    events: {
        eventData: any;
        setEventData: React.Dispatch<React.SetStateAction<any>>;
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
    events: {
        eventData: null,
        setEventData: ((value: any) => {}) as React.Dispatch<React.SetStateAction<any>>,
    }
});


/**
 * Renders the basic shell for the site.
 * @returns App component
 */
export default function App (): React.ReactElement {
    const [ primaryColor, _setPrimaryColor ] = useState<string>('#2499FF');
    const [isDark, _setIsDark] = useState<boolean>(false);
    const [ page, setPage] = useState<PageRoute>("dashboard");
    const [ loggedIn, setLoggedIn ] = useState<boolean>(false);
    const [ userName, setUserName] = useState<string>("");
    const [ frame, setFrame ] = useState<string | null>(null);
    const [ eventData, setEventData ] = useState<any>();

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
        },
        events: {
            eventData,
            setEventData
        }
    };

    const fetchData = useCallback(async () => {
        const response = await fetch('/events.json', {
            headers: {
                "Content-Type": "application/json",
                 "Accept": "application/json"
            }
        });
        const data = await response.json();
        setEventData(data);
    }, [])


    useEffect(() => {
        const cookies = getCookie();
        if (cookies) {
            _setIsDark(cookies.isDark === 'true');
            document.querySelector('body')?.style.setProperty('--accent', cookies.accent as any);
            _setPrimaryColor(cookies.accent as any);
        }
        fetchData(); // Fetch data when the component mounts
    }, []);

    useEffect(() => {
        console.log(eventData);
    }, [eventData]);

    return (
        <SiteContext.Provider value={value as IContext}>
            <PageRouter />
        </SiteContext.Provider>
    )
}