import React from 'react';
import './statusbar.css';

const statusbar = (props) => (
    <span>
        {props.master
            ? <span className="pr-3 pl-1 text-danger master">You're a room master</span>
            : <span className="pr-3 pl-1 text-info master">Room master: {props.createdBy}</span>
        }
        <span className="pl-3 pr-0 text-muted">All users in room: </span>
        {props.users.map(user => (<span key={user + new Date()} className="p-1 text-muted">{user}</span>))}
        {props.graphManaged
            ? <span className="pr-1 pl-1 text-muted managed">You're managing the graph: <span className="text-warning">{props.graphOperation.toLowerCase()}</span></span>
            : null
        }
    </span>
);

export default statusbar;