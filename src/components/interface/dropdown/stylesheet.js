import { primaryBoxShadow, shallowShadow } from "../../../assets/stylesheet";

export const styles = theme => ({
	popperClose: {
		pointerEvents: "none"
	},
	popperResponsive: {
		zIndex: "1200",
		maxHeight: "80%",
		overflowY: "auto",
		...shallowShadow
	},
	dropdown: {
		position: "relative",
		zIndex: "1201",
		height: "100%",
		borderRadius: "0.25rem",
		width: "30rem",
		padding: theme.spacing(1, 0),
		textAlign: "left",
		listStyle: "none",
		backgroundColor: "#fff",
		[theme.breakpoints.down("sm")]: {
			width: "80vw"
		}
	},
	menuList: {
		padding: 0
	},
	dropdownItem: {
		padding: theme.spacing(2),
		margin: theme.spacing(0, 1),
		transition: "all 150ms linear",
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		"&:hover": {
			backgroundColor: theme.palette.primary.light,
			color: "#FFFFFF",
			...primaryBoxShadow
		}
	},
	dropdownDividerItem: {
		margin: theme.spacing(0.5, 0),
		backgroundColor: "rgba(0, 0, 0, 0.12)",
		height: "1px"
	},
	buttonIcon: {
		color: "white",
		padding: 0,
		margin: 0
	},
	buttonText: {
		minWidth: 0,
		color: "white",
		padding: theme.spacing(1.75),
		borderRadius: "50%"
	},
	dropdownHeader: {
		padding: theme.spacing(2),
		margin: theme.spacing(0, 1),
		transition: "all 150ms linear"
	},
	label: {
		width: "100%",
		height: "auto",
		overflowWrap: "break-word",
		whiteSpace: "normal"
	}
});
