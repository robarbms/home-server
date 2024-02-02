import React from 'react';
import {Link} from 'react-router-dom';

/**
 * Properties for a nav link
 */
export type NavItemProps = {
    icon?: string,
    title: string,
    url?: string,
    to?: string
}

/**
 * Rendering for a nav item used in the navigation
 * @param props icon, title and url for a nav item
 * @returns 
 */
export default function NavItem(props: NavItemProps) : React.ReactElement {
    const {icon, title, url, to} = props;
    return (
        <div className="nav-item">
            {url &&
                <a href={url}>
                    {title}
                </a>
            }
            {to &&
                <Link to={to}>{title}</Link>
            }
        </div>
    )
}