import { shallowShadow } from "../../../../assets/stylesheet";

export const styles = theme => ({
	root: {
		maxWidth: "620px",
		background: "#ffffff",
		opacity: 0.9,
		animationName: "$fadeIn",
		animationDuration: "1s",
		fontFamily:
			"source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
		fontSize: "1.25rem",
		border: "1px solid #152434",
		textAlign: "left",
		position: "absolute",
		userSelect: "none",
		top: "30%",
		left: "5%",
		...shallowShadow
	},
	syntax: {
		padding: theme.spacing(1, 3)
	},
	"@keyframes fadeIn": {
		from: { opacity: 0 },
		to: { opacity: 0.9 }
	}
});
