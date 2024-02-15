import React from 'react';
import '../styles/site.css';
import PageRouter from './pages/PageRouter';

/**
 * Renders the basic shell for the site.
 * @returns App component
 */
export default function App (): React.ReactElement {
    return (
        <PageRouter />
    )
}