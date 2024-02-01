import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/see_all.css';

export default function SeeAll(props) {
    const {page} = props;

    return (
        <Link className="see_all" to={`/${page}`}>See all >></Link>
    )
}
