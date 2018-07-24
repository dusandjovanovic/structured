import React from 'react';
import classes from './navigationItem.css'
import {NavLink} from 'react-router-dom'

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink activeClassName={classes.active}
                 to={props.link}
                 exact={props.exact} >
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;