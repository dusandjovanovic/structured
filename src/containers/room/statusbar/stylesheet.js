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
		padding: theme.spacing(0, 0.5)
	},
	elementLight: {
		color: "#dedede"
	},
	elementHighlighted: {
		color: theme.palette.ternary.light
	},
	bordered: {
		borderRight: "1px solid #969696",
		padding: theme.spacing(0, 2),
		marginRight: theme.spacing(2)
	},
	managed: {
		float: "right",
		marginRight: theme.spacing(0.5)
	},
	elementManaged: {
		textTransform: "uppercase",
		fontWeight: "bold"
	}
});
