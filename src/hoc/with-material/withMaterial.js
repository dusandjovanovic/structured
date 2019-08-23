import React from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";

const withMaterial = Component => {
	class WithMaterial extends React.Component {
		theme = createMuiTheme({
			palette: {
				primary: {
					light: "#52565c",
					main: "#3d4250",
					dark: "#202329"
				},
				secondary: {
					light: "#ff1e68",
					main: "#e91e63",
					dark: "#991545"
				},
				ternary: {
					light: "#f0f4c3",
					main: "#e6ee9c",
					dark: "#dce775"
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
