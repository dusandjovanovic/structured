import { cardShadow, cardShadowHover } from "../../../assets/stylesheet";

export const styles = theme => ({
	card: {
		flex: "1",
		margin: theme.spacing(0, 1),
		transition: "all 0.25s ease-in-out",
		...cardShadow,
		...cardShadowHover,
		"&:last-child": {
			marginRight: 0
		},
		"&:first-child": {
			marginLeft: 0
		},
		[theme.breakpoints.down("md")]: {
			margin: theme.spacing(1, 1)
		}
	},
	content: {
		backgroundColor: "#fdfdff",
		padding: theme.spacing(1)
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
		fontWeight: "normal"
	},
	subtitle: {
		color: "#4f4f4f"
	}
});
