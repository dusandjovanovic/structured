import React from "react";

/* eslint react/display-name: 0 */

const withIOMessaging = WrappedComponent => {
    return class extends React.Component {
        socket = null;

        constructor(props) {
            super(props);
            this.socket = this.props.io("http://localhost:2998/chat");
        }

        componentWillUnmount() {
            this.socket.close();
        }

        messageSendIO = (message, room, sender) => {
            this.socket.emit("chat message", {
                room: room,
                sender: sender,
                msg: message
            });
        };

        render() {
            return (
                <WrappedComponent
                    messageSendIO={this.messageSendIO}
                    socket={this.socket}
                    {...this.props}
                />
            );
        }
    };
};

export default withIOMessaging;
