import React from "react";
import PropTypes from "prop-types";

import Dashboard from "@material-ui/icons/Dashboard";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

function withNavigation(WrappedComponent) {
    return class extends React.Component {
        state = {
            value: "/"
        };

        onNavigate = (event, value) => {
            this.setState({
                value
            });
            this.props.history.push(value);
        };

        componentDidUpdate(prevProps, prevState, snapshot) {
            this.initiateByPath(this.props.history.location.pathname);
        }

        componentDidMount() {
            this.initiateByPath(this.props.history.location.pathname);
        }

        initiateByPath = pathname => {
            if (this.state.value !== pathname) {
                this.setState({
                    value: pathname
                });
            }
        };

        render() {
            let renderNavigation = null;
            if (!this.props.authenticated)
                renderNavigation = [
                    { label: "HOME", value: "/", icon: null },
                    { label: "LOGIN", value: "/auth", icon: null }
                ];
            else
                renderNavigation = [
                    { label: "HOME", value: "/", icon: null },
                    {
                        label: "DASHBOARD",
                        value: "/dashboard",
                        icon: Dashboard
                    }
                ];

            return (
                <WrappedComponent
                    links={renderNavigation}
                    navigate={this.onNavigate}
                    active={this.state.value}
                    color="primary"
                    {...this.props}
                />
            );
        }
    };
}

withNavigation.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated
    };
};

export default compose(
    withRouter,
    connect(mapStateToProps),
    withNavigation
);
