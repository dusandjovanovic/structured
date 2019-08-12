import React from "react";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

class Homescreen extends React.Component {
    render() {
        const { classes } = this.props;
        return <div className={classes.root}>blah blah blah</div>;
    }
}

export default withStyles(styles)(Homescreen);
