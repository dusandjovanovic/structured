import React from 'react';
import './graphLogger.css';

const graphLogger = (props) => (
    <div className="Logger mr-2 ml-2">
        <div className="p-2 text-info holder">Focused node: <span className="node">{props.nodeFocused ? props.nodeFocused.key : null}</span></div>
        <div className="p-2 text-info holder">Selected node: <span className="selected">{props.nodeSelected ? props.nodeSelected.key : null}</span></div>
        <div className="p-2 holder">Current node: <span className="node">{props.nodeCurrent ? props.nodeCurrent.key : null}</span></div>
        <div className="p-2 text-secondary holder">Root node: <span className="node">{props.nodeRoot ? props.nodeRoot.key : null}</span></div>
        <div className="p-2 text-secondary holder">Watched nodes:
            <span>{props.nodesSelected.map(node => (<span className="watched">{node}</span>))}</span>
        </div>
    </div>
);

export default graphLogger;
