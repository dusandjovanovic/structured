import React, { Component } from 'react';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from './containers/layout/layout';
import Auth from './containers/auth/auth';
import Logout from './containers/auth/logout/logout';
import { RoomPlayground, RoomCompete, RoomLearn } from './containers/room/room';
import Homescreen from './components/homescreen/homescreen';
import Home from './containers/home/home';
import NotificationContainer from './containers/notifications/notifications';
import withAsyncLoading from './hoc/with-async-loading/withAsyncLoading';
import * as actions from './redux/actions/index';

const withAsyncDashboard = withAsyncLoading(() => {
    return import('./containers/dashboard/dashboard');
});

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignIn();
    }

    render() {
        let routing = (
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="/" exact component={Homescreen}/>
                <Redirect to="/"/>
            </Switch>
        );
        if (this.props.authenticated)
            routing = (
                <Switch>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/dashboard" component={withAsyncDashboard}/>
                    <Route path="/room" component={RoomPlayground}/>
                    <Route path="/compete" component={RoomCompete}/>
                    <Route path="/learn" component={RoomLearn}/>
                    <Route path="/" exact component={Home}/>
                </Switch>
            );
        return (
            <React.Fragment>
                <Layout>
                    <NotificationContainer/>
                    {routing}
                </Layout>
            </React.Fragment>
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
