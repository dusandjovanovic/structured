import React from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';

const dashboardNavbar = (props) => (
    <Nav vertical className="dashboardbar">
        <NavItem>
            <NavLink active onClick={() => props.dashboardSelected(true)} href="#">
                <i className="fas fa-fw fa-tachometer-alt"> </i>
                <span>&nbsp;&nbsp;Dashboard</span>
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink onClick={() => props.dashboardSelected(false)} href="#">
                <i className="fas fa-users"> </i>
                <span>&nbsp;&nbsp;Friends</span>
            </NavLink>
        </NavItem>
    </Nav>
);

export default dashboardNavbar;