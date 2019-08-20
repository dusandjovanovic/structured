import { cardShadow, cardShadowHover } from "../../../assets/stylesheet";

export const styles = theme => ({
	container: {
		minWidth: 0,
		flex: "1",
		margin: theme.spacing(0, 1),
		transition: "all 0.25s ease-in-out",
		"&:last-child": {
			marginRight: 0
		},
		"&:first-child": {
			marginLeft: 0
		},
		...cardShadow,
		...cardShadowHover,
		[theme.breakpoints.down("md")]: {
			margin: theme.spacing(1, 0)
		}
	},
	children: {
		padding: theme.spacing(1),
		width: "100%",
		height: "100%"
	},
	title: {
		margin: theme.spacing(2, 4),
		fontWeight: "normal"
	},
	horizontalLine: {
		width: "90%",
		height: "1px",
		border: 0,
		backgroundImage:
			"linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0))"
	}
});
