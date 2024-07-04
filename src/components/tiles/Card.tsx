import React, { useContext } from "react";
import '../../styles/card.css';
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { SiteContext } from "../App";

export type CardLink = {
    text: string;
    link?: string;
    click?: (event: MouseEvent) => void;
    target?: string;
    title?: string;
}

const FooterLink = ({text, link, click, target, title, loadFrame}: CardLink & {loadFrame: Function}) => (
    link ? <a className="footer" target={target} onClick={() => loadFrame(link)} title={title || text}>{text}  <ChevronDoubleRightIcon /></a> :
    <a className="footer" onClick={click as any} title={title || text}>{text}  <ChevronDoubleRightIcon /></a>
);

type CardProperties = {
    children?: React.ReactElement | React.ReactElement[];
    heading?: string;
    size?: string;
    addClass?: string;
    footer?: any;
}

export default function Card(props: CardProperties): React.ReactElement {
    const { heading, children, size, addClass, footer } = props;
    let cn: string = `card`;
    if (size) cn += ` card-${size}`
    if (addClass) cn += ` ${addClass}`;
    const settings = useContext(SiteContext);
    const { loadFrame } = settings.navigation;

    return(
        <div className={cn}>
            {heading &&
                <div className="card-heading">
                    <h2>{heading}</h2>
                </div>
            }
            <div className="card-content">
                {children}
            </div>
            {footer &&
                <FooterLink {...footer} loadFrame={loadFrame} />
            }
        </div>
    )
}