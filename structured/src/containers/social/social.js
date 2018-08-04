import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/index';
import Request from './request/request';
import { ListGroup, Badge, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import classes from './social.css';

export class Social extends Component {
    componentDidMount() {
        this.props.onGetUserData(this.props.username);
    };

    state = {

    };

    render() {
        let friends = null;
        if (this.props.friends) {
            friends = (
                <ListGroup flush className={classes.Listview}>
                    {
                        this.props.friends.map((friend => (
                            <ListGroupItem className="justify-content-between" key={friend} action>
                                <ListGroupItemHeading>{friend}</ListGroupItemHeading>
                                <ListGroupItemText>
                                    <div className="d-flex w-100 justify-content-between">
                                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed
                                            diam eget risus varius blandit.</p>
                                        <small>3 days ago</small>
                                    </div>
                                    <small>Donec id elit non mi porta.</small>
                                </ListGroupItemText>
                            </ListGroupItem>
                        )))
                    }
                </ListGroup>
        );
        }
        return (
            <div>
                {friends}
                <Request sender={this.props.username}
                         placeholder="Username"
                         info="Send a new friend request:"
                         onAddFriend={(sender, receiver) => this.props.onAddFriend(sender, receiver)}
                />
            </div>
        );
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
        onGetUserData: (username) => dispatch(actions.userData(username)),
        onAddFriend: (sender, receiver) => dispatch(actions.friendAdd(sender, receiver))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Social);