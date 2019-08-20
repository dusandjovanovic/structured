import React from "react";
import BoundaryErrorFallback from "./boundary-error-fallback/boundaryErrorFallback";
import PropTypes from "prop-types";

class BoundaryError extends React.Component {
	state = {
		hasError: false,
		error: null
	};

	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			error: error
		};
	}

	render() {
		return this.state.hasError ? (
			<BoundaryErrorFallback code={this.state.error} />
		) : (
			this.props.children
		);
	}
}

BoundaryError.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired
};

export default BoundaryError;
