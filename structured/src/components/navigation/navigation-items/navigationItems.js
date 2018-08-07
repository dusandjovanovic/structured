import React from 'react';
import './navigationItems.css'
import NavigationItem from './navigation-item/navigationItem'

const navigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem exact link="/">Home</NavigationItem>
        {props.isAuthenticated
            ? <NavigationItem link="/social">Friends</NavigationItem>
            : null}
        {props.isAuthenticated
            ? <NavigationItem link="/logout">Logout</NavigationItem>
            : <NavigationItem link="/auth">Get started</NavigationItem>
        }
    </ul>
);

export default navigationItems;