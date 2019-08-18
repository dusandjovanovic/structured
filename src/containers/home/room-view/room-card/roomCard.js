import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const roomCard = props => {
    const { classes } = props;

    return (
        <Card className={classes.card}>
            <CardContent className={classes.content}>
                <Typography className={classes.title}>{props.name}</Typography>
                <Typography className={classes.subtitle}>
                    {props.type}
                </Typography>
            </CardContent>
            <div className={classes.details}>
                <div className={classes.time}>
                    {new Date(props.time).toLocaleDateString("en-us", {
                        hour: "numeric",
                        minute: "numeric"
                    })}
                </div>
                <div className={classes.attending}>
                    <Typography variant="body1" color="primary">
                        {props.currentUsers} members in the room
                    </Typography>
                    <Typography variant="body1" color="secondary">
                        out of {props.maxUsers}
                    </Typography>
                </div>
            </div>
            <CardActions
                className={classes.actions}
                onClick={() =>
                    props.enterRoom(props.name, props.maxUsers, props.type)
                }
            >
                <Typography variant="body1" className={classes.actionsText}>
                    Join this room
                </Typography>
            </CardActions>
            {props.currentUsers === props.maxUsers ? (
                <div className={classes.occupied}>
                    <Typography
                        variant="h5"
                        color="textSecondary"
                        className={classes.occupiedTitle}
                    >
                        Room is full
                    </Typography>
                    <Typography variant="h4" color="textSecondary">
                        {props.currentUsers}
                    </Typography>
                    <Typography variant="h5" color="textSecondary">
                        {props.maxUsers}
                    </Typography>
                </div>
            ) : null}
        </Card>
    );
};

roomCard.propTypes = {
    classes: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    currentUsers: PropTypes.number.isRequired,
    maxUsers: PropTypes.number.isRequired,
    enterRoom: PropTypes.func.isRequired
};

export default withStyles(styles)(React.memo(roomCard));
