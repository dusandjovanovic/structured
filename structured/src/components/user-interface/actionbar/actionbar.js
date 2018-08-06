import React from 'react';
import './actionbar.css';

const actionbar = (props) => (
    <div className="Actionbar">
        {props.children}
    </div>
);

export default actionbar;