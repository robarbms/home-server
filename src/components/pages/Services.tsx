import React, {useContext} from 'react';
import {links, Link} from '../../data/services';
import Page, { PageProps } from './Page';
import Card from '../tiles/Card';
import {LabeledLink} from '../tiles/Services';

function ContactDetails (props: Link) {
    const {phone, email, hours, links} = props; 
    return (
        <div className="contact-detail">
            {phone &&
                <LabeledLink label="Phone" link={phone} />
            }
            {email && 
                <LabeledLink label="Email" link={email} />
            }
            {hours &&
                <LabeledLink label="Hours" link={hours} />
            }
        </div>
    )
}

type ServiceTileProps = {
    text: string,
    link?: string,
    phone?: string,
    email?: string,
    hours?: string,
    links?: Link[],
    key: number
}


function ServiceTile(props: ServiceTileProps) {
    const {text, link, phone, email, hours, links} = props;


    return (
        <Card>
            <h2><a href={link} target="_blank">{text}</a></h2>
            <ContactDetails {...props} />
            <ul className="cont-detail-links">
                {links && links.length > 0 &&
                    links.map(({text, link}, index) => <li key={index}><a href={link} target="_blank">{text}</a></li>)
                }
            </ul>
        </Card>
    )
}


export default function ServicesPage(props: PageProps) {
    return (
        <Page navigation={props.navigation} title="Services">
            {links.map((service, index) => <ServiceTile {...service} key={index} />)}
        </Page>
    )
}
