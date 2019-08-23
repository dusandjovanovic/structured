import React from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";

const withMaterial = Component => {
	class WithMaterial extends React.Component {
		theme = createMuiTheme({
			palette: {
				primary: {
					light: "#70a6bc",
					main: "#40778c",
					dark: "#064b5f"
				},
				secondary: {
					light: "#fa5788",
					main: "#c2185b",
					dark: "#8c0032"
				},
				ternary: {
					light: "#ffff6b",
					main: "#fdd835",
					dark: "#c6a700"
				}
			},
			typography: {
				fontFamily:
					"-apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
			}
		});

		render() {
			return (
				<ThemeProvider theme={this.theme}>
					<CssBaseline />
					<Component />
				</ThemeProvider>
			);
		}
	}

	return WithMaterial;
};

export default withMaterial;
