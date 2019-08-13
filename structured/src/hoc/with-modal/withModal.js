import React from "react";
import Modal from "@material-ui/core/Modal";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

/* eslint react/display-name: 0 */

const withModal = WrappedComponent => {
    class ProxyClass extends React.Component {
        render() {
            const { classes } = this.props;

            return (
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    className={classes.modal}
                    open={this.props.open}
                >
                    <div className={classes.container}>
                        <WrappedComponent {...this.props} classes={null} />
                    </div>
                </Modal>
            );
        }
    }

    return withStyles(styles)(ProxyClass);
};

export default withModal;
