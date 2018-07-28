import React from 'react';
import classes from './toolbar.css';
import NavigationItems from '../navigation-items/navigationItems';
import Logo from '../../logo/logo';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Logo />
        {props.children}
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
);

export default toolbar;