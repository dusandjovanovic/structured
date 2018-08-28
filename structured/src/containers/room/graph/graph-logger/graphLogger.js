import React from 'react';
import './graphLogger.css';

const graphLogger = (props) => (
    <div className="Logger mr-2 ml-2">
        <div className="p-2 text-info holder"><span className="pr-2">Selected:</span><span className="selected">{props.nodeSelected ? props.nodeSelected.key : null}</span></div>
        <div className="p-2 holder"><span className="pr-2">Adjacent:</span>
            <span>{props.nodesAdjacent.map(node => (<span key={node} className="adjacent">{node}</span>))}</span>
        </div>
        <div className="p-2 pr-4 text-secondary holder"><span className="pr-2">Root:</span><span className="node">{props.nodeRoot}</span></div>
        <div className="p-2 pr-4 text-secondary holder"><span className="pr-2">Highlighted:</span>
            <span>{props.nodesHighlighted.map(node => (<span key={node} className="watched">{node}</span>))}</span>
        </div>
        {props.algorithmState
            ? <div>
                <hr className="p-2" />
                <div className="p-2 holder"><span className="pr-2">Current:</span><span className="selected">{props.algorithmState.tempVertex}</span></div>
                <div className="p-2 holder"><span className="pr-2">Unvisited:</span><span className="node">{props.algorithmState.unvisitedVertex}</span></div>
                <div className="p-2 text-secondary holder"><span className="pr-2">Visited:</span>
                    <span>{props.algorithmState.visited.map(node => (<span key={node} className="node">{node}</span>))}</span>
                </div>
                <div className="p-2 text-secondary holder"><span className="pr-2">Traversed:</span>
                    <span>{props.algorithmState.solution.map(node => (<span key={node} className="watched">{node}</span>))}</span>
                </div>
              </div>
            : null
        }
    </div>
);

export default graphLogger;
