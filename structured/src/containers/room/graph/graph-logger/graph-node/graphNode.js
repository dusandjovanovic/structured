import React from "react";

const graphNode = props => {
    return (
        <div className={props.holderClass}>
            <span>{props.text}</span>
            {props.show ? (
                <span className={props.nodeClass}>{props.node}</span>
            ) : null}
        </div>
    );
};

export default React.memo(graphNode);
