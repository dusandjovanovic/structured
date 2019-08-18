import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const boundaryLoading = props => {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <CircularProgress color="secondary" size={60} />
        </div>
    );
};

boundaryLoading.propTypes = {
    classes: PropTypes.object.isRequired
};

export default React.memo(withStyles(styles)(boundaryLoading));
