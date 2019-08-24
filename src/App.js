import React from "react";
import AppFrame from "./containers/frame/frame";
import BoundaryError from "./components/interface/boundary-error/boundaryError";
import BoundaryLoading from "./components/interface/boundary-loading/boundaryLoading";
import NotificationHandler from "./components/compound/notification-handler/notificationHandler";
import withMaterial from "./hoc/with-material/withMaterial";
import PropTypes from "prop-types";

import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { authenticatePersisted } from "./store/actions/index";

const Homescreen = React.lazy(() => import("./containers/homescreen/homescreen"));
const Auth = React.lazy(() => import("./containers/auth/auth"));
const Home = React.lazy(() => import("./containers/home/home"));
const Dashboard = React.lazy(() => import("./containers/dashboard/dashboard"));
const RoomPlayground = React.lazy(() => import("./containers/room/room").then(module => ({ default: module.RoomPlayground })));
const RoomCompete = React.lazy(() => import("./containers/room/room").then(module => ({ default: module.RoomCompete })));
const RoomLearn = React.lazy(() => import("./containers/room/room").then(module => ({ default: module.RoomLearn })));

class App extends React.Component {
	componentDidMount() {
		this.props.authenticatePersisted();
	}

	render() {
		return (
			<BoundaryError>
				<AppFrame>
					<NotificationHandler />
					{!this.props.authenticated ? (
						<React.Suspense fallback={<BoundaryLoading />}>
							<Switch>
								<Route path="/auth" exact>
									<Auth />
								</Route>
								<Route path="/" exact>
									<Homescreen />
								</Route>
								<Redirect to="/" />
							</Switch>
						</React.Suspense>
					) : (
						<React.Suspense fallback={<BoundaryLoading />}>
							<Switch>
								<Route path="/auth" exact>
									<Auth />
								</Route>
								<Route path="/dashboard" exact>
									<Dashboard />
								</Route>
								<Route path="/room" exact>
									<RoomPlayground />
								</Route>
								<Route path="/compete" exact>
									<RoomCompete />
								</Route>
								<Route path="/learn" exact>
									<RoomLearn />
								</Route>
								<Route path="/" exact>
									<Home />
								</Route>
								<Redirect to="/" />
							</Switch>
						</React.Suspense>
					)}
				</AppFrame>
			</BoundaryError>
		);
	}
}

const mapStateToProps = state => {
	return {
		authenticated: state.auth.authenticated
	};
};

const mapDispatchToProps = dispatch => {
	return {
		authenticatePersisted: () => dispatch(authenticatePersisted())
	};
};

App.propTypes = {
	authenticated: PropTypes.bool,
	authenticatePersisted: PropTypes.func
};

export default withMaterial(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
