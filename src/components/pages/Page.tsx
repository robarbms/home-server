import React, { MouseEventHandler, useContext, useState } from "react";
import Navigation, { NavigationProps } from "../navigation/Navigation";
import { SiteNavigationProps  } from "../../data/navigation";
import '../../styles/page.css';
import {SiteContext} from '../App';
import Header from "../navigation/Header";
import { CogIcon } from "@heroicons/react/24/outline";

/**
 * Properties used to render the page layout
 */
export type PageProps = {
    navigation: SiteNavigationProps;
    children?: React.ReactElement | React.ReactElement[];
    title?: string;
    full?: boolean;
    className?: string;
}

/**
 * The overall page layout for the site
 * @param props 
 * @returns 
 */
export default function Page(props: PageProps) : React.ReactElement {
    const settings = useContext(SiteContext);
    const [ settingsOpen, setSettingsOpen ] = useState(false);
    const actions = (
        <div className="settings-open" onClick={() => setSettingsOpen(true)}><CogIcon /></div>
    );

    return (
        <div className={`page${settings.theme.isDark ? ' dark' : ''} ${props.full ? 'full-content' : ''} ${props.title ? 'page-with-title' : ''} ${props.className ? props.className : ""}`}>
            {settings.theme.backgroundImage && settings.theme.backgroundImage !== null &&
                <img className="background-image" src={settings.theme.backgroundImage} alt="" />
            }
            <div className="background-overlay"></div>
            <Header actions={actions} />
            <Navigation settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} navigation={props.navigation} />
            <div className="content-area">
                {props.title &&
                    <h1>{props.title}</h1>
                }
                <div className="content">{props.children}</div>
            </div>
        </div>
    )
}