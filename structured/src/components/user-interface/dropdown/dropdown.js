import React from "react";
import ToolTip from "react-portal-tooltip";
import DropdownElement from './dropdown-element/dropdown-element';
import classes from './dropdown.css';
import * as actions from "../../../redux/actions";
import connect from "react-redux/es/connect/connect";

const style = {
    style: {
        width: '400px'
    },
    arrowStyle: {
        borderColor: false
    }
};

const dropdown = (props) => {
    return (
        props.isAuthenticated
        ?
        <div className={classes.Dropdown}>
            <p id="text" onMouseEnter={props.showRequests} onMouseLeave={props.hideRequests}>{props.name}</p>
            <ToolTip active={props.active}
                     style={style}
                     position="bottom"
                     arrow="center"
                     align="center"
                     parent="#text">
                    { props.elements
                        ? props.elements.map((element) => {
                            return (
                                    <div key={element.data}>
                                        <DropdownElement element={element}
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