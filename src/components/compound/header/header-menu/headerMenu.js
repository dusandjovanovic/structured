import React from "react";
import Dropdown from "../../../interface/dropdown/dropdown";
import AccountBox from "@material-ui/icons/AccountBox";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { authenticateLogout } from "../../../../store/actions/index";

const headerMenu = props => (
	<React.Fragment>
		<Dropdown
			dropdownHeader="Account menu"
			buttonIcon={AccountBox}
			dropdownList={[
				{
					label: "Log out",
					action: props.authLogout
				}
			]}
		/>
	</React.Fragment>
);

const mapDispatchToProps = dispatch => {
	return {
		authLogout: () => dispatch(authenticateLogout())
	};
};

headerMenu.propTypes = {
	authLogout: PropTypes.func
};

export default connect(
	null,
	mapDispatchToProps
)(React.memo(headerMenu));
