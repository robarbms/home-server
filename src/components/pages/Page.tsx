import React, { MouseEventHandler } from "react";
import Navigation, { NavigationProps } from "../navigation/Navigation";
import { SiteNavigationProps  } from "../../data/navigation";
import '../../styles/page.css';

/**
 * Properties used to render the page layout
 */
export type PageProps = {
    navigation: SiteNavigationProps,
    children?: React.ReactElement | React.ReactElement[],
    isDark: boolean,
    setDark: MouseEventHandler,
    title?: string
}

/**
 * The overall page layout for the site
 * @param props 
 * @returns 
 */
export default function Page(props: PageProps) : React.ReactElement {
    return (
        <div className={`page${props.isDark ? ' dark' : ''}`}>
            <Navigation setDark={props.setDark} navigation={props.navigation} />
            <div className="content-area">
                {props.title &&
                    <h1>{props.title}</h1>
                }
                <div className="content">{props.children}</div>
            </div>
        </div>
    )
}