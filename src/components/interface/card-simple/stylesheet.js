import { cardShadow, cardShadowHover } from "../../../assets/stylesheet";

export const styles = theme => ({
	card: {
		...cardShadow,
		...cardShadowHover,
		[theme.breakpoints.down("md")]: {
			margin: theme.spacing(1, 1)
		}
	},
	content: {
		backgroundColor: "#fdfdff",
		padding: theme.spacing(2)
	},
	icon: {
		backgroundColor: "#fefefe",
		border: "1px solid #f7f7f7",
		borderRadius: "50%",
		padding: theme.spacing(2),
		display: "inline-block"
	},
	actions: {
		borderTop: "1px solid rgba(122, 122, 122, 0.1)",
		padding: theme.spacing(2)
	},
	title: {
		fontWeight: "normal",
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis"
	},
	subtitle: {
		color: "#4f4f4f"
	},
	details: {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis"
	}
});
