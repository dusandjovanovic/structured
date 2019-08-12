import React from "react";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";

import {styles} from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

class Toolbar extends React.PureComponent {
    state = {
        opaque: true
    };

    componentDidMount() {
        window.addEventListener("scroll", this.handleScrollEvent);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScrollEvent);
    }

    handleScrollEvent = () => {
        if (window.scrollY > 64 && this.state.opaque) {
            this.setState({
                opaque: false
            });
        }
        else if (window.scrollY < 64 && !this.state.opaque) {
            this.setState({
                opaque: true
            });
        }
    };

    render() {
        const {classes} = this.props;
        let appBarClasses;
        if (this.state.opaque)
            appBarClasses = classes.appBar;
        else
            appBarClasses = `${classes.appBar} ${classes.appBarTransparent}`;

        return (
            <AppBar position="fixed" className={appBarClasses}>
                {this.props.children}
            </AppBar>
        );
    }
}

Toolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default withStyles(styles)(Toolbar);
