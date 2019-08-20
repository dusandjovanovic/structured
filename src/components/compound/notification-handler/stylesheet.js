export const styles = theme => ({
	root: {
		position: "fixed",
		top: "calc(64px + 1em)",
		right: 0,
		zIndex: "1301",
		width: "35%",
		minHeight: 0,
		maxHeight: "calc(100% - 64px - 1rem)",
		overflowY: "auto",
		[theme.breakpoints.down("md")]: {
			width: "45%"
		},
		[theme.breakpoints.down("sm")]: {
			width: "100%"
		}
	}
});
