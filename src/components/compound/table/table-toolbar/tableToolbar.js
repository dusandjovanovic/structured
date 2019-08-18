import React from "react";
import InfoIcon from "@material-ui/icons/Info";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import {styles} from "./stylesheet";

const tableToolbar = props => {
    const {classes, numSelected, title, action} = props;
    let toolbarClasses = `${classes.root} ${
        numSelected > 0 ? classes.highlight : undefined
        }`;
    return (
        <Toolbar className={toolbarClasses}>
            <div className={classes.titleContainer}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle" className={classes.title}>
                        {title}
                    </Typography>
                )}
            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Info">
                        <IconButton aria-label="Info" onClick={() => action()}>
                            <InfoIcon/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    undefined
                )}
            </div>
        </Toolbar>
    );
};

tableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
};

export default withStyles(styles)(tableToolbar);
