import React from 'react';
import classes from './actionbar.css';
import Button from '../../user-interface/button/button';

const actionbar = (props) => (
    <div className={classes.Actionbar}>
        {props.children}
    </div>
);

export default actionbar;