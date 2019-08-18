import React from "react";
import ProgressIndicator from "../../components/building-blocks/progress-indicator/progressIndicator";
import Typography from "@material-ui/core/Typography";

const withLoadingBranch = WrappedComponent => {
    return class extends WrappedComponent {
        render() {
            return (
                <React.Fragment>
                    {this.props.waiting ? (
                        <div style={{ marginTop: "64px", paddingTop: "1rem" }}>
                            <ProgressIndicator />
                            <Typography
                                variant="h5"
                                style={{
                                    fontWeight: 350,
                                    marginTop: "1.5rem",
                                    marginBottom: "0.25rem",
                                    textAlign: "center"
                                }}
                            >
                                We are handling things for you. Please wait.
                            </Typography>
                            <Typography
                                variant="caption"
                                style={{
                                    textAlign: "center",
                                    color: "#7b7b7b"
                                }}
                            >
                                The page will load as soon as the response
                                comes..
                            </Typography>
                        </div>
                    ) : (
                        super.render()
                    )}
                </React.Fragment>
            );
        }
    };
};

export default withLoadingBranch;
