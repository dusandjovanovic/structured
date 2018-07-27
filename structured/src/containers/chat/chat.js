import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/index';
import Request from '../social/request/request';

export class Chat extends Component {
    componentDidMount() {
        this.props.onGetUserData(this.props.username);
    };

    sendMessage1 = (sender, receiver) => {
        // backend
    };

    sendMessage2 = (sender, receiver) => {
        // backend
    };

    render() {
        let friends = null;
        return (
            <div>
                <Request
                    sender={this.props.username}
                    placeholder="message"
                    info=""
                    onAddFriend={(sender, receiver) => this.sendMessage1(sender, receiver)}/>

                <Request
                    sender={this.props.username}
                    placeholder="message"
                    info=""
                    onAddFriend={(sender, receiver) => this.sendMessage2(sender, receiver)}/>
            </div>);
    };
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        friends: state.user.friends
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onGetUserData: (username) => dispatch(actions.userData(username))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Chat);
