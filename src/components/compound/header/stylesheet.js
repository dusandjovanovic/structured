import {
	container,
	boxShadow,
	drawerWidth,
	transition,
	darkBoxShadow,
	whiteBoxShadow
} from "../../../assets/stylesheet";

export const styles = theme => ({
	appBar: {
		height: "64px",
		display: "flex",
		border: "0",
		padding: theme.spacing(0.75, 0),
		marginBottom: "20px",
		color: "#555",
		width: "100%",
		backgroundColor: "#fff",
		transition: "all 0.25s ease-in-out",
		alignItems: "center",
		flexFlow: "row nowrap",
		justifyContent: "flex-start",
		position: "relative",
		zIndex: "unset"
	},
	absolute: {
		position: "absolute",
		zIndex: "1100"
	},
	fixed: {
		position: "fixed",
		zIndex: "1100"
	},
	container: {
		...container,
		height: "64px",
		flex: "1",
		alignItems: "center",
		justifyContent: "space-between",
		display: "flex",
		flexWrap: "nowrap"
	},
	flex: {
		flex: 1
	},
	title: {
		lineHeight: "64px",
		fontSize: "1.5rem",
		fontWeight: "lighter",
		borderRadius: "3px",
		textTransform: "none",
		color: "inherit",
		"&:hover,&:focus": {
			color: "inherit",
			background: "transparent"
		}
	},
	appResponsive: {
		margin: "20px 10px"
	},
	links: {
		listStyleType: "none",
		margin: 0,
		padding: 0
	},
	primary: {
		backgroundColor: theme.palette.primary.main,
		color: "#FFFFFF",
		...boxShadow
	},
	transparent: {
		backgroundColor: "transparent !important",
		boxShadow: "none",
		color: "#FFFFFF"
	},
	dark: {
		color: "#FFFFFF",
		backgroundColor: "#414141 !important",
		...darkBoxShadow
	},
	white: {
		border: "0",
		padding: "0.625rem 0",
		marginBottom: "20px",
		color: "#555",
		backgroundColor: "#fff !important",
		...whiteBoxShadow
	},
	drawerPaper: {
		border: "none",
		bottom: "0",
		transitionProperty: "top, bottom, width",
		transitionDuration: ".2s, .2s, .35s",
		transitionTimingFunction: "linear, linear, ease",
		width: drawerWidth,
		position: "fixed",
		display: "block",
		top: "0",
		height: "100vh",
		right: "0",
		left: "auto",
		visibility: "visible",
		overflowY: "visible",
		borderTop: "none",
		textAlign: "left",
		paddingRight: "0px",
		paddingLeft: "0",
		...boxShadow,
		...transition
	}
});
