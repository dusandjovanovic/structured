import { shallowShadow } from "../../../assets/stylesheet";

export const styles = theme => ({
	root: {
		width: "40%",
		margin: "2rem auto",
		textAlign: "center",
		border: "1px solid #eee",
		[theme.breakpoints.down("md")]: {
			width: "70%"
		},
		[theme.breakpoints.down("sm")]: {
			width: "90%"
		},
		...shallowShadow
	},
	inputs: {
		padding: theme.spacing(4),
		[theme.breakpoints.down("md")]: {
			paddingLeft: "2rem",
			paddingRight: "2rem"
		},
		[theme.breakpoints.down("sm")]: {
			paddingLeft: "1rem",
			paddingRight: "1rem"
		}
	},
	highlighted: {
		color: "#ffffff"
	},
	spaced: {
		padding: theme.spacing(4)
	},
	borderline: {
		padding: theme.spacing(4),
		backgroundColor: theme.palette.primary.main
	},
	horizontalLine: {
		width: "90%",
		height: "1px",
		border: 0,
		backgroundImage:
			"linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0))"
	},
	override: {
		color: theme.palette.ternary.main
	}
});
