import React from 'react';
import Card from '../Card';
import {links, Link} from '../../data/services';
import '../../styles/services.css';
import {Link as RouterLink} from 'react-router-dom';
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

function ServiceContact (props: Link) {
    const {text, link} = props;

    return (
        <div className="util-cont">
            <div className="contact"><a className="link" href={link} target="_blank">{text}</a></div>
        </div>
    )
}

export default function Services() {
    return (
        <Card size="2">
            <div className="services">
                <h2><RouterLink to="services">Services</RouterLink></h2>
                {links.map((link, index) => <ServiceContact {...link} key={index} />)}
                <SeeAll page="services" />
            </div>
        </Card>
    )
}