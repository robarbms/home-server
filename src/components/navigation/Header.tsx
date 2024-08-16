import React, { useContext, useState } from 'react';
import { HomeIcon, CloudIcon, CalendarIcon, KeyIcon, CpuChipIcon, TvIcon, Bars3Icon, CodeBracketIcon, ChartPieIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SiteContext } from '../App';
import { Drawer } from 'antd';

type HeaderLinkProps = {
    title: string;
    icon: any;
    link?: (() => void) | string;
    click?: () => void;
    loadFrame: (url: string) => void;
    href?: string;
}

const HeaderLink = (props: HeaderLinkProps) => {
    let {title, link, icon, click, loadFrame, href} = props;

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
            {href &&
                <a href={href} target="_blank" title={title}>
                    {icon && icon}
                    {title}
                </a>
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
    const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false);

    const links = [
        {
            "title": "Dashboard",
            "click": () => setPage("dashboard"),
            "icon": <ChartPieIcon />
        },
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
            "icon": <CodeBracketIcon />
        },
        {
            "title": "Plex",
            "link": "http://home:32400/web/index.html",
            "icon": <TvIcon />
        },
        {
            "title": "NextCloud",
            "href": "http://home:8080",
            "icon": <CloudIcon />
        },
        {
            "title": "Search",
            "href": "http://home:42003",
            "icon": <MagnifyingGlassIcon />
        }
    ]
    return (
        <div className="header">
            <div className="header-main">
                <div className="mobile-menu-open" onClick={() => setMobileMenuOpen(true)}><Bars3Icon /></div>
                <Drawer className="mobile-menu" title="Menu" onClose={() => setMobileMenuOpen(false)} open={mobileMenuOpen} placement="left">
                    {links.map((link, idx) => <HeaderLink key={idx} {...link} loadFrame={loadFrame} />)}
                </Drawer>
                {links.map((link, idx) => <HeaderLink key={idx} {...link} loadFrame={loadFrame} />)}
            </div>
            <div className="header-right">
                {actions && actions}
            </div>
        </div>
    )
}

export default Header;
