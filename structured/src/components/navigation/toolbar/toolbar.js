import React from 'react';
import NavigationItems from '../navigation-items/navigationItems';
import Logo from '../../logo/logo';
import './toolbar.css';

const toolbar = (props) => (
    <header className="Toolbar">
        <Logo />
        {props.children}
        <nav className="DesktopOnly">
            <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
);

export default toolbar;