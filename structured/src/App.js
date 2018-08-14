import React, { Component } from 'react';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from './containers/layout/layout';
import Auth from './containers/auth/auth';
import Logout from './containers/auth/logout/logout';
import Room from './containers/room/room';
import Homescreen from './components/homescreen/homescreen';
import Home from './containers/home/home';
import NotificationContainer from './containers/notifications/notifications';
import withAsyncLoading from './hoc/with-async-loading/withAsyncLoading';
import * as actions from './redux/actions/index';

const withAsyncSocial = withAsyncLoading(() => {
    return import('./containers/social/social');
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
                    <Route path="/social" component={withAsyncSocial}/>
                    <Route path="/room" component={Room}/>
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
