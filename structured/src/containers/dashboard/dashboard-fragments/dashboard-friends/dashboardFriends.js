import React from "react";
import PropTypes from "prop-types";

import {styles} from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

class DashboardFriends extends React.PureComponent {
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                
            </div>
        );
    }
}

DashboardFriends.propTypes = {
    classes: PropTypes.object.isRequired,
    friends: PropTypes.arrayOf(PropTypes.string).isRequired,
    friendAdd: PropTypes.func.isRequired
};

export default withStyles(styles)(DashboardFriends);
