import React from 'react';
import classes from './listElement.css';
import Picture from '../../../components/logo/logo';

const listElement = (props) => {
    return (
        <div className={classes.Element}>
            <div className={classes.Avatar}>
                <Picture height="48" width="48"/>
            </div>
            <p className={classes.Username}>{props.username}</p>
            <span className={classes.BioTitle}>Bio:  </span>
            <span className={classes.Bio}>{props.bio}</span>
        </div>
    );
};

export default listElement;