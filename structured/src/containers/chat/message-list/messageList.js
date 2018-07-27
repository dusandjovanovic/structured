import React from 'react';
import classes from './messagesList.css';

const messageList = (props) => {
    return (
        <div className={classes.Messages}>
            {props.messages.map(msg => (
                <p style={{align: 'center'}}>{msg.sender}: {msg.content}</p>
            ))}
        </div>
    );
};

export default messageList;