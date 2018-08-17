import React from 'react';
import './graphLogger.css';

const graphLogger = (props) => (
    <div className="Logger mr-2 ml-2">
        <div className="p-2 text-info holder">Selected node: <span className="selected">{props.nodeSelected ? props.nodeSelected.key : null}</span></div>
        <div className="p-2 holder">Adjacent nodes:&nbsp;
            <span>{props.nodesAdjacent.map(node => (<span key={node} className="adjacent">{node}</span>))}</span>
        </div>
        <div className="p-2 holder">Current node: <span className="node">{props.nodeCurrent}</span></div>
        <div className="p-2 text-secondary holder">Root node: <span className="node">{props.nodeRoot}</span></div>
        <div className="p-2 text-secondary holder">Highlighted nodes:&nbsp;
            <span>{props.nodesHighlighted.map(node => (<span key={node} className="watched">{node}</span>))}</span>
        </div>
    </div>
);

export default graphLogger;
