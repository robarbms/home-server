import React, { useContext } from 'react';
import { HomeIcon, CloudIcon, CalendarIcon, KeyIcon, CpuChipIcon, TvIcon } from '@heroicons/react/24/outline';
import { SiteContext } from '../App';

type HeaderLinkProps = {
    title: string;
    icon: any;
    link?: (() => void) | string;
    click?: () => void;
    loadFrame: (url: string) => void;
}

const HeaderLink = (props: HeaderLinkProps) => {
    let {title, link, icon, click, loadFrame} = props;

    return (
        <div className="header-link">
            {click &&
                <span onClick={click}>
                    {icon && icon}
                    {title}
                </span>
            }
            {link && typeof link === 'string' && 
                <span onClick={() => loadFrame(link)}>
                    {icon && icon}
                    {title}
                </span>
            }
        </div>
    );
}

type HeaderProps = {
    actions: any;
}

const Header = (props: HeaderProps) => {
    const { actions } = props;
    const settings = useContext(SiteContext);
    const { setPage, loadFrame } = settings.navigation;

    const links = [
        {
            "title": "Home",
            "click": () => setPage("home"),
            "icon": <HomeIcon />
        },
        {
            "title": "Events",
            "click": () => setPage("events"),
            "icon": <CalendarIcon />
        },
        {
            "title": "AI",
            "click": () => setPage("ai"),
            "icon": <CpuChipIcon />
        },
        {
            "title": "Plex",
            "link": "http://home:32400/web/index.html",
            "icon": <TvIcon />
        },
        {
            "title": "NextCloud",
            "link": "http://home:8080",
            "icon": <CloudIcon />
        },
    ]
    return (
        <div className="header">
            <div className="header-main">
                {links.map((link, idx) => <HeaderLink key={idx} {...link} loadFrame={loadFrame} />)}
            </div>
            <div className="header-right">
                {actions && actions}
            </div>
        </div>
    )
}

export default Header;
