import React from 'react';
import classes from './actionbar.css';

const actionbar = (props) => (
    <div className={classes.Actionbar}>
        {props.children}
    </div>
);

export default actionbar;