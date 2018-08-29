import React from "react";
import ToolTip from "react-portal-tooltip";
import DropdownElement from './dropdown-element/dropdown-element';
import './dropdown.css';

const style = {
    style: {
        width: '400px',
        margin: '15px 0px'
    },
    arrowStyle: {
    }
};

const dropdown = (props) => {

    let placeholder = true;
    if (!props.elements || props.elements.length === 0)
        placeholder = false;

    return (
        props.isAuthenticated
        ?
        <div className="Dropdown">
            <div id="holder"
               onMouseEnter={props.showRequests}
               onMouseLeave={props.hideRequests}>
                <i className="fas fa-user-friends"> </i>
                </div>
            <ToolTip active={props.active}
                     style={style}
                     position="bottom"
                     arrow="center"
                     align="center"
                     parent="#holder">
                    { placeholder
                        ? props.elements.map((element) => (
                                <div key={element.sender}>
                                    <DropdownElement element={element.sender}
                                                     clickedLeft={element.clickedLeft}
                                                     clickedRight={element.clickedRight} />
                                </div>
                                )
                        )
                        : <div style={{textAlign: 'center', margin: '10px 0px'}}>{props.default}</div>
                    }
            </ToolTip>
        </div>
        : null
    );
};

export default dropdown;