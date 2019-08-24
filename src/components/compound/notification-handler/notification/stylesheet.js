import {
	primaryColor,
	infoColor,
	successColor,
	warningColor,
	dangerColor,
	primaryBoxShadow,
	infoBoxShadow,
	successBoxShadow,
	warningBoxShadow,
	dangerBoxShadow,
	container,
	boxShadow
} from "../../../../assets/stylesheet";

export const styles = theme => ({
	root: {
		position: "relative",
		padding: theme.spacing(2),
		margin: theme.spacing(2.5),
		lineHeight: "2rem",
		fontSize: "1rem",
		borderRadius: "2px",
		...boxShadow
	},
	info: {
		backgroundColor: infoColor,
		color: "#ffffff",
		...infoBoxShadow
	},
	success: {
		backgroundColor: successColor,
		color: "#ffffff",
		...successBoxShadow
	},
	warning: {
		backgroundColor: warningColor,
		color: "#ffffff",
		...warningBoxShadow
	},
	danger: {
		backgroundColor: dangerColor,
		color: "#ffffff",
		...dangerBoxShadow
	},
	primary: {
		backgroundColor: primaryColor,
		color: "#ffffff",
		...primaryBoxShadow
	},
	message: {
		padding: "0",
		maxWidth: "89%"
	},
	close: {
		width: "14px",
		height: "14px",
		display: "inline-block"
	},
	icon: {
		height: "2rem",
		display: "inline-block",
		float: "left",
		marginRight: theme.spacing(2)
	},
	container: {
		...container,
		position: "relative"
	}
});
