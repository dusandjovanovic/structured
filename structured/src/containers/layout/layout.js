import React, {Component} from 'react';
import {connect} from 'react-redux';
import Wrapper from '../../components-higher/wrapper/wrapper';
import Toolbar from '../../components/navigation/toolbar/toolbar';
import Dropdown from '../../components/user-interface/dropdown/dropdown';
import * as actions from "../../redux/actions";
import './layout.css';

class Layout extends Component {
    state = {
        showRequests: false,
        elementsRequests: []
    };

    componentWillReceiveProps(nextProps) {
        let newState = {
            elementsRequests: nextProps.requests
        };
        for (let state in newState.elementsRequests)
            newState.elementsRequests[state] = {
                ...newState.elementsRequests[state],
                clickedLeft: () => this.props.onFriendConfirm(newState.elementsRequests[state].id, newState.elementsRequests[state].receiver),
                clickedRight: () => this.props.onFriendDelete(newState.elementsRequests[state].id, newState.elementsRequests[state].receiver)
            }
        this.setState(newState);
    };

    showRequestsHandler = (event) => {
        event.preventDefault();
        this.setState({
            showRequests: !this.state.showRequests
        });
    };

    render() {
        return (
            <Wrapper>
                {this.props.collapse
                    ? <Toolbar isAuthenticated={this.props.isAuthenticated}>
                        <Dropdown showRequests={(event) => this.showRequestsHandler(event)}
                                  hideRequests={(event) => this.showRequestsHandler(event)}
                                  name="Friend requests"
                                  active={this.state.showRequests}
                                  elements={this.state.elementsRequests}
                                  isAuthenticated={this.props.isAuthenticated}
                                  default="You don't have any requests."
                        />
                    </Toolbar>
                    : null
                }
                <main className="Content">
                    {this.props.children}
                </main>
            </Wrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        requests: state.user.requests,
        collapse: !state.room.data._id || !state.room.waiting
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFriendConfirm: (requestId, username) => dispatch(actions.friendConfirm(requestId, username)),
        onFriendDelete: (requestId, username) => dispatch(actions.friendDelete(requestId, username))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Layout);