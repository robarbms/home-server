import React from 'react';
import Page, { PageProps } from '../Page';
import Time from '../tiles/Time';
import Calendar from '../tiles/Calendar';
import Services from '../tiles/Services';


export default function Home(props: PageProps) {
    return (
        <Page isDark={props.isDark} navigation={props.navigation} setDark={props.setDark}>
            <Time></Time>
            <Calendar></Calendar>
            <Services></Services>
        </Page>
    );
}