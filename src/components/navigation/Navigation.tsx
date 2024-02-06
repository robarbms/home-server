import React, { MouseEventHandler, useState } from 'react';
import { SiteNavigationProps } from '../../data/navigation';
import NavSection from './NavSection';
import SetDark from './SetDark';
import '../../styles/navigation.css';
import Settings from './Settings';

export type NavigationProps = {
    navigation: SiteNavigationProps,
    setDark: MouseEventHandler
}

export default function Navigation(props: NavigationProps) : React.ReactElement {
    const { navigation } = props;
    const navSections = navigation.map((navSection, index) => <NavSection key={index} {...navSection} />)
    const [drawerOpen, setDrawerOpen] = useState(false);



    return (
        <nav className={`navigation nav_${drawerOpen ? 'open' : 'close'}`}>
            <div className="drawer_open">
                <div className="settings_open" onClick={setDrawerOpen.bind(null, true)}>
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M512 661.994667q61.994667 0 106.005333-44.010667t44.010667-106.005333-44.010667-106.005333-106.005333-44.010667-106.005333 44.010667-44.010667 106.005333 44.010667 106.005333 106.005333 44.010667zM829.994667 554.005333l90.005333 69.994667q13.994667 10.005333 4.010667 28.010667l-85.994667 148.010667q-8 13.994667-26.005333 8l-106.005333-42.005333q-42.005333 29.994667-72 42.005333l-16 112q-4.010667 18.005333-20.010667 18.005333l-172.010667 0q-16 0-20.010667-18.005333l-16-112q-37.994667-16-72-42.005333l-106.005333 42.005333q-18.005333 5.994667-26.005333-8l-85.994667-148.010667q-10.005333-18.005333 4.010667-28.010667l90.005333-69.994667q-2.005333-13.994667-2.005333-42.005333t2.005333-42.005333l-90.005333-69.994667q-13.994667-10.005333-4.010667-28.010667l85.994667-148.010667q8-13.994667 26.005333-8l106.005333 42.005333q42.005333-29.994667 72-42.005333l16-112q4.010667-18.005333 20.010667-18.005333l172.010667 0q16 0 20.010667 18.005333l16 112q37.994667 16 72 42.005333l106.005333-42.005333q18.005333-5.994667 26.005333 8l85.994667 148.010667q10.005333 18.005333-4.010667 28.010667l-90.005333 69.994667q2.005333 13.994667 2.005333 42.005333t-2.005333 42.005333z"  />
                </svg>
                </div>
                <div className="settings_close" onClick={setDrawerOpen.bind(null, false)}>X</div>
            </div>
            <Settings setDark={props.setDark} />
        </nav>
    )
}
