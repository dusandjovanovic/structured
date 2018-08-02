import React, { Component } from 'react';
import Layout from './containers/layout/layout';
import Auth from './containers/auth/auth';
import Logout from './containers/auth/logout/logout';
import Social from './containers/social/social';
import Chat from './containers/chat/chat';
import Room from './containers/room/room';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './redux/actions/index';
import NotificationContainer from './containers/notifications/notifications';
import Homescreen from './components/homescreen/homescreen';

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignIn();
    }

    render() {
        let available = (
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="/" exact component={Homescreen}/>
                <Redirect to="/"/>
            </Switch>
        );
        if (this.props.authenticated)
            available = (
                <Switch>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/social" component={Social}/>
                    <Route path="/graph" component={Room}/>
                    <Route path="/chat" component={Chat}/>
                    <Route path="/" exact render={() => <h2 style={{textAlign: 'center'}}> structured </h2>}/>
                </Switch>
            );
        return (
            <div>
                <Layout>
                    <NotificationContainer/>
                    {available}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        requests: state.user.requests
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignIn: () => dispatch(actions.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App));
