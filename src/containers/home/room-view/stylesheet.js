export const styles = theme => ({
	root: {
		padding: theme.spacing(4, 16),
		margin: 0,
		width: "100%",
		[theme.breakpoints.down("md")]: {
			padding: theme.spacing(4, 8)
		},
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing(4, 4)
		}
	}
});
