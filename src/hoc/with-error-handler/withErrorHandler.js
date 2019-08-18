import { compose } from "redux";
import { connect } from "react-redux";
import { internalNotificationsAdd } from "../../store/actions/index";

const withErrorHandler = WrappedComponent => {
    return class extends WrappedComponent {
        componentDidUpdate(prevProps, prevState, snapshot) {
            if (this.props.error !== prevProps.error)
                this.setState({
                    error: {
                        hasError: this.props.error !== null,
                        description: this.props.error
                    }
                });

            if (
                this.state.error.hasError &&
                this.state.error !== prevState.error
            )
                this.props.internalNotificationsAdd(
                    this.state.error.description,
                    "warning",
                    null
                );

            if (this.auxiliaryComponentDidUpdate)
                this.auxiliaryComponentDidUpdate(
                    prevProps,
                    prevState,
                    snapshot
                );
        }

        render() {
            return super.render();
        }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        internalNotificationsAdd: (message, variant, id) =>
            dispatch(internalNotificationsAdd(message, variant, id))
    };
};

export default compose(
    connect(
        null,
        mapDispatchToProps
    ),
    withErrorHandler
);
