import React from 'react';
import {links, Link} from '../../data/services';
import Page, { PageProps } from '../Page';
import Card from '../Card';
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


function ServiceTile(props) {
    const {text, link, phone, email, hours, links} = props;


    return (
        <Card size="2">
            <h2><a href={link} target="_blank">{text}</a></h2>
            <ContactDetails {...props} />
            <ul className="cont-detail-links">
                {links && links.length > 0 &&
                    links.map(({text, link}, index) => <li><a href={link} target="_blank">{text}</a></li>)
                }
            </ul>
        </Card>
    )
}


export default function ServicesPage(props: PageProps) {
    return (
        <Page isDark={props.isDark} navigation={props.navigation} setDark={props.setDark}>
            <h1>Services</h1>
            {links.map((service, index) => <ServiceTile {...service} key={index} />)}
        </Page>
    )
}
