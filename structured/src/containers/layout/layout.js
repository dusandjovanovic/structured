import React, {Component} from 'react';
import {connect} from 'react-redux';
import Wrapper from '../../components-higher/wrapper/wrapper';
import Toolbar from '../../components/navigation/toolbar/toolbar';
import Dropdown from '../../components/user-interface/dropdown/dropdown';
import classes from './layout.css';
import * as actions from "../../redux/actions";

class Layout extends Component {
    state = {
        showRequests: false,
        elementsRequests: [{data: '_Friend123', clickedRight: null, clickedLeft: null}, {data: '_Friend222', clickedRight: null, clickedLeft: null}, {data: '_Friend255', clickedRight: null, clickedLeft: null}]
    };

    showRequestsHandler = (event) => {
        event.preventDefault();
        console.log(this.props.request);
        this.setState({
            showRequests: !this.state.showRequests
        });
    };

    render() {
        return (
            <Wrapper>
                <Toolbar isAuthenticated={this.props.isAuthenticated}>
                    <Dropdown showRequests={(event) => this.showRequestsHandler(event)}
                              hideRequests={(event) => this.showRequestsHandler(event)}
                              name="Friend requests"
                              active={this.state.showRequests}
                              elements={this.state.elementsRequests}
                              isAuthenticated={this.props.isAuthenticated}
                              default="You don't have any requests."
                    />
                </Toolbar>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Wrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        requests: state.user.requests
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFriendConfirm: (requestId, username) => dispatch(actions.friendConfirm(requestId, username)),
        onFriendDelete: (requestId, username) => dispatch(actions.friendDelete(requestId, username))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Layout);