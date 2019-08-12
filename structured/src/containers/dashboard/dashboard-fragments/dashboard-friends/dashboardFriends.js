import React from "react";
import Card from "../../../../components/interface/card/card";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

class DashboardFriends extends React.PureComponent {
    state = {
        name: ""
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange("name")}
                    />
                    <Button
                        variant="text"
                        color="secondary"
                        onClick={() => this.props.friendAdd(this.state.name)}
                    >
                        Send a friend request
                    </Button>
                </div>
                <div className={classes.container}>
                    <Card title="Your friends">
                        <List aria-label="list-friends">
                            {this.props.friends.map(element => (
                                <ListItem button key={element}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={element}
                                        secondary="Friends since a long time ago"
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                    <Card title="Pending friend requests">
                        <List aria-label="list-requests">
                            {this.props.requests.map(element => (
                                <ListItem
                                    button
                                    key={element}
                                    onClick={() =>
                                        this.props.friendConfirm(
                                            element.requestId
                                        )
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <CheckCircleIcon color="secondary" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={element}
                                        secondary="Click here to accept this request"
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                </div>
            </div>
        );
    }
}

DashboardFriends.propTypes = {
    classes: PropTypes.object.isRequired,
    friends: PropTypes.arrayOf(PropTypes.string).isRequired,
    requests: PropTypes.arrayOf(PropTypes.string).isRequired,
    friendAdd: PropTypes.func.isRequired,
    friendConfirm: PropTypes.func.isRequired
};

export default withStyles(styles)(DashboardFriends);
