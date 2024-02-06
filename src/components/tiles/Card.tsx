import React from "react";
import '../../styles/card.css';

type CardProperties = {
    children?: React.ReactElement | React.ReactElement[],
    heading?: string,
    size?: string,
    addClass?: string,
}

export default function Card(props: CardProperties): React.ReactElement {
    const { heading, children, size, addClass} = props;
    let cn: string = `card`;
    if (size) cn += ` card-${size}x`
    if (addClass) cn += ` ${addClass}`;

    return(
        <div className={cn}>
            {heading &&
                <h2>{heading}</h2>
            }
            {children}
        </div>
    )
}