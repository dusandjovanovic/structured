import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const boundaryErrorFallback = props => {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <Typography
                variant="h4"
                style={{ fontWeight: 350, textAlign: "center" }}
            >
                :(
            </Typography>
            <Typography
                variant="h5"
                style={{
                    fontWeight: 400,
                    marginTop: "2rem",
                    textAlign: "center"
                }}
            >
                We are sorry but something went wrong
            </Typography>
            <Typography
                variant="body1"
                style={{
                    fontWeight: 350,
                    marginTop: "0.75rem",
                    textAlign: "center",
                    color: "#7a7a7a"
                }}
            >
                Please refresh the app
            </Typography>
            <Typography
                variant="caption"
                style={{
                    fontWeight: 350,
                    marginTop: "0.75rem",
                    textAlign: "center",
                    color: "#ae8476"
                }}
            >
                {props.code.toString()}
            </Typography>
        </div>
    );
};

boundaryErrorFallback.propTypes = {
    classes: PropTypes.object.isRequired,
    code: PropTypes.object.isRequired
};

export default React.memo(withStyles(styles)(boundaryErrorFallback));
