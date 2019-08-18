import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const progressIndicator = props => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <LinearProgress color="secondary" />
        </div>
    );
};

progressIndicator.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(React.memo(progressIndicator));
