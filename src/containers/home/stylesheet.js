import { horizontalDivider } from "../../assets/stylesheet";

export const styles = theme => ({
	root: {
		marginTop: "64px",
		padding: theme.spacing(4, 0),
		width: "100%"
	},
	horizontalLine: {
		width: "100%",
		height: "1px",
		border: 0,
		backgroundImage:
			"linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))"
	},
	...horizontalDivider(theme)
});
