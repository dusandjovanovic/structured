import React from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";

const withMaterial = Component => {
	class WithMaterial extends React.Component {
		theme = createMuiTheme({
			palette: {
				primary: {
					light: "#718792",
					main: "#455a64",
					dark: "#1c313a"
				},
				secondary: {
					light: "#62ebff",
					main: "#00b8d4",
					dark: "#0088a3"
				},
				ternary: {
					light: "#76ffff",
					main: "#18ffff",
					dark: "#00cbcc"
				}
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
