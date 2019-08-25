import { graphColors } from "../../../../assets/stylesheet";

export const styles = theme => ({
	root: {
		width: "100%",
		fontSize: "1rem",
		fontFamily:
			"source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
		padding: theme.spacing(3)
	},
	holder: {
		height: "2rem",
		lineHeight: "2rem"
	},
	separator: {
		padding: theme.spacing(2)
	},
	node: {
		fontSize: "0.9rem",
		background: "#33373e",
		color: "#ffffff",
		borderRadius: "50%",
		display: "inline-block",
		lineHeight: "1.8rem",
		textAlign: "center",
		width: "1.8rem",
		height: "1.8rem",
		boxShadow: "0px 1px 2px rgba(69,69,69,0.25)",
		marginLeft: theme.spacing(1)
	},
	nodeUndefined: {
		fontSize: "0.9rem",
		color: graphColors.visited.stroke,
		fontWeight: "lighter",
		display: "inline-block",
		lineHeight: "1.8rem",
		marginLeft: theme.spacing(1)
	},
	algorithm: {
		fontSize: "0.9rem",
		color: graphColors.edge.stroke,
		fontWeight: "lighter",
		display: "inline-block",
		lineHeight: "1.8rem"
	},
	selected: {
		background: graphColors.selected.fill
	},
	watched: {
		background: graphColors.clicked.fill
	},
	adjacent: {
		background: graphColors.adjacent.fill
	},
	selectedText: {
		color: graphColors.selected.fill
	},
	primaryText: {
		color: graphColors.visited.fill
	},
	primaryAltText: {
		color: graphColors.visited.stroke
	}
});
