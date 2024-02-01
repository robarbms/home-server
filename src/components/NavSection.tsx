import React from 'react';
import NavItem, { NavItemProps } from './NavItem';

/**
 * Properties for a navigation section
 */
export type NavSectionProps = {
    group: string,
    navItems: NavItemProps[]
}

/**
 * Rendering for a nav section
 * @param props 
 * @returns 
 */
export default function NavSection(props: NavSectionProps) {
    const { group, navItems } = props;
    return (
        <div className="nav-section">
            {group && <h3>{group}</h3>}
            {navItems.map((navItem, index) => <NavItem key={index} {...navItem} />)}
        </div>
    );
}
