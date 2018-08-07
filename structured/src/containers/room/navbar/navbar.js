import React from 'react';
import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';

const navbar = (props) => (
    <Nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <NavItem>
            <NavLink className="navbar-brand" href="#">Graph room</NavLink>
        </NavItem>

        <Navbar>
            {props.room.master
                ? (
                    <NavItem className="text-nowrap">
                        <NavLink className="nav-link text-danger"
                                 onClick={() => props.deleteRoom()}
                                 href="#">Delete room</NavLink>
                    </NavItem>
                )
                : null
            }
            <NavItem className="text-nowrap">
                <NavLink className="nav-link text-secondary"
                         onClick={() => props.leaveRoom()}
                         href="#">Leave room</NavLink>
            </NavItem>
        </Navbar>
    </Nav>
);

export default navbar;