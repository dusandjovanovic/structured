import React from 'react';
import './graphLogger.css';

const graphLogger = (props) => (
    <div className="Logger mr-2 ml-2">
        <div className="p-2 text-info">Focused node: {props.nodeFocused ? props.nodeFocused.key : null}</div>
        <div className="p-2 text-info">Selected node: {props.nodeSelected ? props.nodeSelected.key : null}</div>
        <div className="p-2">Current node: {props.nodeCurrent ? props.nodeCurrent.key : null}</div>
        <div className="p-2 text-secondary">Root node: {props.nodeRoot ? props.nodeRoot.key : null}</div>
    </div>
);

export default graphLogger;
