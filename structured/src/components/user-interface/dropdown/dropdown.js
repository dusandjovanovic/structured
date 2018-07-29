import React from "react";
import ToolTip from "react-portal-tooltip";
import DropdownElement from './dropdown-element/dropdown-element';
import classes from './dropdown.css';

const style = {
    style: {
        width: '400px',
        margin: '15px 0px'
    },
    arrowStyle: {
    }
};

const dropdown = (props) => {
    return (
        props.isAuthenticated
        ?
        <div className={classes.Dropdown}>
            <p id="holder"
               onMouseEnter={props.showRequests}
               onMouseLeave={props.hideRequests}>{props.name}</p>
            <ToolTip active={props.active}
                     style={style}
                     position="bottom"
                     arrow="center"
                     align="center"
                     parent="#holder">
                    { props.elements
                        ? props.elements.map((element) => {
                            return (
                                    <div key={element.sender}>
                                        <DropdownElement element={element.sender}
                                                         clickedLeft={element.clickedLeft}
                                                         clickedRight={element.clickedRight}
                                                         />
                                    </div>
                            )
                        })
                        : <p>{props.default}</p>
                    }
            </ToolTip>
        </div>
        : null
    );
};

export default dropdown;