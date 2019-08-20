export const styles = theme => ({
	root: {
		width: "60%",
		margin: "auto",
		marginTop: theme.spacing(12),
		padding: theme.spacing(6),
		border: "1px solid #ebebeb",
		boxShadow: "0 1px 6px rgba(128, 128, 128, 0.35)",
		backgroundColor: "#faf6d0",
		backgroundImage:
			"repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(255,255,255,.4) 50px, rgba(255,255,255,.4) 100px)",
		[theme.breakpoints.down("sm")]: {
			width: "90%"
		}
	}
});
