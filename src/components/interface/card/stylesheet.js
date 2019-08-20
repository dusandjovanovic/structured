import { cardShadow, cardShadowHover } from "../../../assets/stylesheet";

export const styles = theme => ({
	container: {
		...cardShadow,
		...cardShadowHover,
		[theme.breakpoints.down("md")]: {
			margin: theme.spacing(1, 0)
		}
	},
	children: {
		padding: theme.spacing(1),
		width: "100%",
		height: "100%",
		borderTop: "1px solid #f7f7f7"
	},
	title: {
		padding: theme.spacing(2, 4),
		fontWeight: "normal"
	}
});
