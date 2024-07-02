import React, { MouseEventHandler, useState } from 'react';
import { SiteNavigationProps } from '../../data/navigation';
import NavSection from './NavSection';
import '../../styles/navigation.css';
import Settings from './Settings';
import { Drawer } from 'antd';

export type NavigationProps = {
    navigation: SiteNavigationProps;
    settingsOpen: boolean;
    setSettingsOpen: (isOpen: boolean) => void;
}

export default function Navigation(props: NavigationProps) : React.ReactElement {
    const { navigation, settingsOpen, setSettingsOpen } = props;
    const navSections = navigation.map((navSection, index) => <NavSection key={index} {...navSection} />)
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <Drawer className="settings-drawer" title="Settings" onClose={() => setSettingsOpen(false)} open={settingsOpen} >
            <Settings />
        </Drawer>
    )
}
