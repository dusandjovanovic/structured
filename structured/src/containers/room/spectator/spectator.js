import React from 'react';
import { Button } from "reactstrap";

const spectator = (props) => (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h3> </h3>
        <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group mr-2">
                <Button className="btn btn-outline-secondary" disabled={props.disabled} onClick={() => props.addNode()}>Add node ↳</Button>
                <Button className="btn btn-outline-secondary" disabled={props.disabled} onClick={() => props.addEdge()}>Add edge ↯</Button>
                <Button className="btn btn-outline-secondary" disabled={props.disabled} onClick={() => props.removeNode()}>Remove node</Button>
                <Button className="btn btn-outline-secondary" disabled={props.disabled} onClick={() => props.removeEdge()}>Remove edge</Button>
            </div>
        </div>
    </div>
);

export default spectator;