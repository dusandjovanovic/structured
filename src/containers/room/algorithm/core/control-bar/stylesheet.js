export const styles = theme => ({
	root: {
		width: "100%",
		textAlign: "center",
		backgroundColor: "#222",
		padding: theme.spacing(2, 0)
	},
	button: {
		display: "inline-block",
		margin: theme.spacing(0, 2),
		color: "#ccc",
		cursor: "pointer",
		"&:hover": {
			color: "#fff"
		}
	}
});
