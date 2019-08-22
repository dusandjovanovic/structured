export const styles = () => ({
	root: {
		marginTop: "64px",
		padding: 0,
		width: "100%",
		height: "calc(100vh - 64px)"
	},
	particles: {
		position: "fixed",
		right: 0,
		bottom: 0,
		left: 0,
		width: "100vw",
		height: "100vh",
		backgroundColor: "#191c20"
	},
	heading: {
		position: "fixed",
		top: "33%",
		left: "12%",
		zIndex: 1001,
		pointerEvents: "none"
	},
	headingText: {
		color: "#ffffff",
		fontWeight: "normal",
		userSelect: "none",
		fontFamily:
			"source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
	},
	headingSubtext: {
		color: "#f1f1f1",
		fontWeight: "lighter",
		userSelect: "none",
		fontFamily:
			"source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
	}
});
