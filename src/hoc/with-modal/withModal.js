import React from "react";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const withModal = WrappedComponent => {
    class WithModal extends React.Component {
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

    WithModal.propTypes = {
        classes: PropTypes.object.isRequired,
        open: PropTypes.bool.isRequired
    };

    return withStyles(styles)(WithModal);
};

export default withModal;
