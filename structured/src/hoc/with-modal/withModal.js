import React from "react";
import Modal from "@material-ui/core/Modal";
import {compose} from "redux";

import {styles} from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

/* eslint react/display-name: 0 */

const withModal = WrappedComponent => {
    return class extends React.Component {
        render() {
            const {classes} = this.props;

            return (
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    className={classes.modalStyle}
                    open={this.props.open}
                >
                    <div className={classes.containerStyle}>
                        <WrappedComponent {...this.props} />
                    </div>
                </Modal>
            );
        }
    };
};

export default compose(
    withStyles(styles),
    withModal
);
