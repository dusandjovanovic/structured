export const styles = theme => ({
	root: {
		padding: theme.spacing(1),
		height: "100%"
	},
	messageContainer: {
		padding: theme.spacing(0.5),
		width: "100%",
		height: "auto",
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "flex-start"
	},
	messageView: {
		padding: theme.spacing(2, 0.5),
		width: "100%",
		maxHeight: "80%",
		overflowY: "auto",
		display: "flex",
		flexDirection: "column"
	},
	messageHolder: {
		width: "100%"
	},
	message: {
		width: "auto",
		overflow: "hidden",
		padding: theme.spacing(1),
		margin: theme.spacing(0.5, 0)
	},
	messageLeft: {
		color: "white",
		float: "left",
		background: theme.palette.secondary.main,
		borderRadius: "10px"
	},
	messageRight: {
		float: "right",
		background: "#dedede",
		borderRadius: "10px"
	},
	textField: {
		width: "80%"
	},
	button: {
		width: "20%"
	}
});
