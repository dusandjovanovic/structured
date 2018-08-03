import React from 'react';
import classes from './navigationItems.css'
import NavigationItem from './navigation-item/navigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/">Home</NavigationItem>
        {props.isAuthenticated
            ? <NavigationItem link="/social">User management</NavigationItem>
            : null}
        {props.isAuthenticated
            ? <NavigationItem link="/chat">Chat</NavigationItem>
            : null}
        {props.isAuthenticated
            ? <NavigationItem link="/room">Room</NavigationItem>
            : null}
        {props.isAuthenticated
            ? <NavigationItem link="/logout">Logout</NavigationItem>
            : <NavigationItem link="/auth">Authenticate</NavigationItem>
        }
    </ul>
);

export default navigationItems;