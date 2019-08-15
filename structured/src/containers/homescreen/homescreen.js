import React from "react";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

class Homescreen extends React.Component {
    render() {
        const { classes } = this.props;
        return <div className={classes.root}>blah blah blah</div>;
    }
}

Homescreen.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Homescreen);
