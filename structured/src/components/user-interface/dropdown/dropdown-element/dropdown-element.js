import React from 'react';
import classes from './dropdown-element.css';

const dropdownElement = (props) => {
    return (
        <div className={classes.DropdownElement} key={props.element.data}>
            <div style={{float:'left', margin: '5px'}}>{props.element.data}</div>

            <div onClick={props.clickedRight} style={{color: '#720909', float: 'right', margin: '5px'}}>ignore</div>
            <div onClick={props.clickedLeft} style={{color: '#61DAFB', float: 'right', position: 'relative', left: '-30px', margin: '5px'}}>accept</div>
        </div>
    )
};

export default dropdownElement;