import React from 'react';
import SocketContext from './socketio-context';

const socketIo = (WrappedComponent) => {
    return (props) => (
        <SocketContext.Consumer>
            {socketio => <WrappedComponent {...props} socketio={socketio}/>}
        </SocketContext.Consumer>
    )
};

export default socketIo;