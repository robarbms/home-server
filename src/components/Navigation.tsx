import React, { MouseEventHandler } from 'react';
import { SiteNavigationProps } from '../data/navigation';
import NavSection from './NavSection';
import SetDark from './SetDark';
import '../styles/navigation.css';

export type NavigationProps = {
    navigation: SiteNavigationProps,
    setDark: MouseEventHandler
}

export default function Navigation(props: NavigationProps) : React.ReactElement {
    const { navigation } = props;
    return (
        <nav className="navigation">
            {navigation.map((navSection, index) => <NavSection key={index} {...navSection} />)}
            <SetDark setDark={props.setDark} />
        </nav>
    )
}
