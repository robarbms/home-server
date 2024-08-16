import React, {createContext, useEffect, useState, MouseEventHandler , useCallback} from 'react';
import '../styles/site.css';
import PageRouter from './pages/PageRouter';
import { getCookie } from './utils/cookies';
import backgrounds from '../data/backgrounds';

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
        backgroundImage: null | "random" | string;
        setBackgroundImage: React.Dispatch<React.SetStateAction<null | "random" | string>>;
        photoQuery: string;
        setPhotoQuery: React.Dispatch<React.SetStateAction<string>>;
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
        setPrimaryColor: ((value: string) => {}) as React.Dispatch<React.SetStateAction<string>>,
        backgroundImage: 'random',
        setBackgroundImage: ((value: null | "random" | string) => {}) as React.Dispatch<React.SetStateAction<null | "random" | string>>,
        photoQuery: "Paris",
        setPhotoQuery: ((value: string) => {}) as React.Dispatch<React.SetStateAction<string>>,
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
    const [ backgroundImage, setBackgroundImage ] = useState<null | "random" | string>('random');
    const [ photoQuery, setPhotoQuery ] = useState<string>("Paris");

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
            backgroundImage,
            setBackgroundImage,
            photoQuery,
            setPhotoQuery
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
    }, []);

    useEffect(() => {
        const cookies = getCookie();
        if (cookies) {
            _setIsDark(cookies.isDark === 'true');
            document.querySelector('body')?.style.setProperty('--accent', cookies.accent as any);
            _setPrimaryColor(cookies.accent as any);
        }
        else {
            document.querySelector('body')?.style.setProperty('--accent', primaryColor as any);
        }
        fetchData(); // Fetch data when the component mounts
    }, []);

    useEffect(() => {
        switch(backgroundImage){
            case 'random':
                const { innerHeight: height, innerWidth: width } = window;
                const aspect = width / height;
                const orientation = aspect > 1.5 ? 'landscape' : aspect < .7 ? 'portrait' : 'squarish';
                const photos = backgrounds[orientation];
                setBackgroundImage(photos[Math.floor(Math.random() * photos.length)]);
                /*
                (async () => {
                    getPhotos(photoQuery).then((images)=>{
                        setBackgroundImage(images[Math.floor(Math.random() * images.length)].urls.regular);
                    })
                    .catch((err)=>{
                        const { innerHeight: height, innerWidth: width } = window;
                        const aspect = width / height;
                        /*
                        const image = aspect > 1.2 ? "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" :
                            aspect < .8 ? "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" :
                        const image = "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        setBackgroundImage(image);
                    });
                })();
                */
                break;
        }

    }, [backgroundImage])

    return (
        <SiteContext.Provider value={value as IContext}>
            <PageRouter />
        </SiteContext.Provider>
    )
}