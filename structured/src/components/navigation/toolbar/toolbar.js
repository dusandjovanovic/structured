import React from 'react';
import classes from './toolbar.css';
import NavigationItems from '../navigation-items/navigationItems'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
);

export default toolbar;