import React from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";

/* eslint react/display-name: 0 */

const withMaterial = (Component) => {
    return class extends React.Component {
        theme = createMuiTheme({
            palette: {
                primary: {
                    light: "#49515f",
                    main: "#282c34",
                    dark: "#121417"
                },
                secondary: {
                    light: "#ff1e68",
                    main: "#e91e63",
                    dark: "#991545"
                },
                ternary: {
                    light: '#f0f4c3',
                    main: '#e6ee9c',
                    dark: '#dce775'
                }
            },
            typography: {
                useNextVariants: true,
                fontFamily: '"Segoe UI", "Helvetica", "Arial", sans-serif'
            },
        });

        render() {
            return (
                <MuiThemeProvider theme={this.theme}>
                    <CssBaseline/>
                    <Component {...this.props} />
                </MuiThemeProvider>
            );
        }
    };
}

export default withMaterial;
