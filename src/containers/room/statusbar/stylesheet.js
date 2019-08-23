export const styles = theme => ({
	root: {
		position: "fixed",
		bottom: 0,
		width: "100%",
		height: "34px",
		lineHeight: "34px",
		backgroundColor: theme.palette.primary.dark
	},
	element: {
		padding: theme.spacing(0, 1)
	},
	elementLight: {
		color: "#cecece"
	},
	bordered: {
		borderRight: "1px solid #767676",
		padding: theme.spacing(0, 2),
		marginRight: theme.spacing(2)
	},
	managed: {
		float: "right"
	}
});
