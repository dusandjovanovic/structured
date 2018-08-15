import React from 'react';
import { Button } from "reactstrap";

const spectator = (props) => (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h3> </h3>
        <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group mr-2">
                <Button outline color="info" disabled={props.disabled} onClick={() => props.addNode()}><i className="fas fa-plus"></i> Add node</Button>
                <Button outline color="info" disabled={props.disabled} onClick={() => props.addEdge()}><i className="fas fa-link"></i> Add edge</Button>
                <Button outline disabled={props.disabled} onClick={() => props.removeNode()}><i className="fas fa-eraser"></i> Remove node</Button>
                <Button outline disabled={props.disabled} onClick={() => props.removeEdge()}><i className="fas fa-unlink"></i> Remove edge</Button>
            </div>
        </div>
    </div>
);

export default spectator;