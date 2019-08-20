export const styles = theme => ({
	appBar: {
		height: "52px",
		width: "100%",
		display: "flex",
		justifyContent: "center",
		position: "fixed",
		top: "64px",
		zIndex: 1
	},
	container: {
		width: "100%",
		overflow: "auto"
	},
	tabsIndicator: {
		backgroundColor: theme.palette.ternary.main
	},
	tabRoot: {
		textTransform: "initial",
		fontWeight: theme.typography.fontWeightRegular,
		marginRight: theme.spacing(2),
		"&:hover": {
			color: theme.palette.ternary.light,
			opacity: 1
		},
		"&$tabSelected": {
			color: "#fbf9ff"
		}
	},
	tabSelected: {},
	typography: {
		padding: theme.spacing(3)
	}
});
