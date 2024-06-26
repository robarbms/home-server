import React from 'react';
import Card from './Card';
import {links, Link} from '../../data/services';
import '../../styles/services.css';
import SeeAll from '../SeeAll';

export function LabeledLink (props: {label: string, link: string}) {
    const {label, link} = props;
    let alink = link;
    if (label.toLowerCase() == "phone") {
        alink = `tel:${alink.replace(/\D/g, '')}`;
    }

    return (
        <div>
            <label>{label}:</label> {label.toLowerCase() != "hours" ? <a className="link" href={alink}>{link}</a> : link}
        </div>
    )
}

export function Contact (props: Link) {
    const {text, link, phone, hours, links} = props;

    return (
        <div className="util_cont">
            <h3><a className="link" href={link} target="_blank">{text}</a></h3>
            <div>
                {phone && <LabeledLink label="Phone" link={phone} />}
                {hours && <LabeledLink label="Hours" link={hours} />}
                <div className="more_links">
                    {links && links.length > 0 && <strong>More links:</strong> }
                    {links?.map((more, index) => (
                        <a href={more.link} key={index}>{more.text}</a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function Services() {
    return (
        <Card
            size="2"
            heading="Utilities and Services"
        >
            <div className="services">
                <div className="serv_cont">
                    {links.map((link, index) => <Contact {...link} key={index} />)}
                </div>
            </div>
        </Card>
    )
}