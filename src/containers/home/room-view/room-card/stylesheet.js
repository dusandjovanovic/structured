import {
	primaryBoxShadow,
	primaryBoxShadowHover,
	transition,
	horizontalDivider
} from "../../../../assets/stylesheet";

export const styles = theme => ({
	card: {
		flex: "1",
		borderRadius: "0.25rem",
		...transition,
		...primaryBoxShadow,
		...primaryBoxShadowHover
	},
	media: {
		paddingTop: "56%"
	},
	content: {
		padding: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start"
	},
	actions: {
		padding: theme.spacing(1.25),
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end"
	},
	chip: {
		margin: theme.spacing(0.25)
	},
	icon: {
		marginLeft: theme.spacing(0.5)
	},
	occupied: {
		position: "absolute",
		padding: "inherit",
		top: "0.75rem",
		left: "0.75rem",
		width: "calc(100% - 1.5rem)",
		height: "calc(100% - 1.5rem)",
		backgroundColor: "rgba(255,220,112, 0.6)",
		backgroundImage:
			"repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,220,112,.4) 35px, rgba(255,220,112,.4) 70px)",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "0.4rem"
	},
	normalizedText: {
		fontWeight: "normal"
	},
	borderlineText: {
		marginBottom: theme.spacing(1)
	},
	...horizontalDivider(theme)
});
