import React from "react";
import Tabbed from "../../components/interface/tabbed/tabbed";
import DashboardView from "./dashboard-view/dashboardView";
import DashboardOverview from "./dashboard-fragments/dashboard-overview/dashboardOverview";
import DashboardFriends from "./dashboard-fragments/dashboard-friends/dashboardFriends";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";
import withErrorHandler from "../../hoc/with-error-handler/withErrorHandler";

export class Dashboard extends React.Component {
    state = {
        error: {
            hasError: false,
            name: null,
            description: null
        },
        selected: 0
    };

    componentDidMount() {
        this.props.userData(this.props.username);
        this.props.userHistory(this.props.username);
    }

    handleSelectionChange = tab => {
        this.setState({
            selected: tab
        });
    };

    render() {
        const { classes } = this.props;

        let dashboardFragment = null;
        switch (this.state.selected) {
            case 1: {
                dashboardFragment = (
                    <DashboardFriends
                        friends={this.props.friends}
                        requests={this.props.requests}
                        friendAdd={this.props.friendAdd}
                        friendConfirm={this.props.friendConfirm}
                    />
                );
                break;
            }
            default:
                dashboardFragment = (
                    <DashboardOverview
                        history={this.props.history}
                        friendsCount={this.props.friends.length}
                        requestsCount={this.props.requests.length}
                        competeCount={this.props.history.length}
                    />
                );
        }

        return (
            <div className={classes.root}>
                <Tabbed
                    labels={["Overview", "Friends and Requests"]}
                    value={this.state.selected}
                    handleSelectionChange={this.handleSelectionChange}
                />
                <DashboardView>{dashboardFragment}</DashboardView>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        friends: state.user.friends,
        requests: state.user.requests,
        history: state.user.history,
        waiting: state.user.waiting,
        error: state.user.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userData: username => dispatch(actions.userData(username)),
        userHistory: username => dispatch(actions.userHistory(username)),
        friendAdd: (receiver) =>
            dispatch(actions.friendAdd(receiver)),
        friendConfirm: (requestId) =>
            dispatch(actions.friendConfirm((requestId)))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(withErrorHandler(Dashboard)));
