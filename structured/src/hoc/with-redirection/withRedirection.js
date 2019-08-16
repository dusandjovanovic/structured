import React from "react";
import { Redirect } from "react-router";

const withRedirection = WrappedComponent => {
    return class extends WrappedComponent {
        render() {
            const { redirect, redirectPath } = this.state.context;

            return redirect ? <Redirect to={redirectPath} /> : super.render();
        }
    };
};

export default withRedirection;
