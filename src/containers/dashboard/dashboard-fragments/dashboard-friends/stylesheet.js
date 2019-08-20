export const styles = theme => ({
	root: {
		width: "100%",
		height: "100%",
		padding: theme.spacing(4, 8),
		[theme.breakpoints.down("md")]: {
			padding: theme.spacing(4)
		},
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing(1)
		}
	},
	container: {
		width: "100%",
		margin: theme.spacing(1, 0)
	}
});
