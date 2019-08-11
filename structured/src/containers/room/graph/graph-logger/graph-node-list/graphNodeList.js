import React from "react";

const graphNodeList = props => {
    return (
        <div className={props.holderClass}>
            <span>{props.text}</span>
            <span>
                {props.nodes.map(node => (
                    <span
                        key={node}
                        className={props.nodeClass}
                    >
                        {node}
                    </span>
                ))}
            </span>
        </div>
    );
};

export default React.memo(graphNodeList);
