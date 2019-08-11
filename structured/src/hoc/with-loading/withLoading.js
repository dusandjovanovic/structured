import React from "react";
import ProgressIndicator from "../../components/building-blocks/progress-indicator/progressIndicator";

/* eslint react/display-name: 0 */

const withLoading = WrappedComponent => {
    return class extends WrappedComponent {
        render() {
            return (
                <React.Fragment>
                    {this.props.waiting ? <ProgressIndicator/> : null}
                    {super.render()}
                </React.Fragment>
            );
        }
    };
};

export default withLoading;
