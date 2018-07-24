import React from 'react';
import classes from './button.css'

const button = (props) => (
    <button className={[classes.Button, classes[props.btnType]].join(' ')}
            disabled={props.disabled}
            onClick={props.clicked}>
        {props.children}
    </button>
);

export default button;