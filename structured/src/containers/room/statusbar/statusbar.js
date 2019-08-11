import React from "react";
import Typography from "@material-ui/core/Typography";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

const statusbar = props => {
    const { classes } = props;
    return (
        <footer className={classes.root}>
            <Typography
                variant="caption"
                color="error"
                className={classNames(classes.element, classes.bordered)}
            >
                {props.master
                    ? "You are a room master"
                    : "Room master:" + props.createdBy}
            </Typography>
            <Typography
                variant="caption"
                className={classNames(classes.element, classes.elementLight)}
            >
                All users in room:{" "}
            </Typography>
            {props.users.map(user => (
                <Typography
                    variant="caption"
                    className={classNames(
                        classes.element,
                        classes.elementLight
                    )}
                    key={user}
                >
                    {user}
                </Typography>
            ))}
            {props.graphManaged ? (
                <Typography
                    variant="caption"
                    className={classNames(
                        classes.element,
                        classes.elementLight,
                        classes.managed
                    )}
                >
                    You are managing the graph:{" "}
                    <Typography
                        variant="caption"
                        color="secondary"
                        className={classes.element}
                    >
                        {props.graphOperation.toLowerCase()}
                    </Typography>
                </Typography>
            ) : null}
        </footer>
    );
};

export default withStyles(styles)(React.memo(statusbar));
