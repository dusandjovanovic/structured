import { lighten } from "@material-ui/core/styles/colorManipulator";

export const styles = theme => ({
	root: {
		paddingRight: theme.spacing(1),
		paddingLeft: theme.spacing(2)
	},
	highlight:
		theme.palette.type === "light"
			? {
					color: theme.palette.primary.main,
					backgroundColor: lighten(theme.palette.primary.light, 0.85)
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.primary.dark
			  },
	spacer: {
		flex: "1 1 100%"
	},
	actions: {
		color: theme.palette.text.primary
	},
	titleContainer: {
		flex: "0 0 auto"
	},
	title: {
		padding: theme.spacing(0, 2),
		fontWeight: "normal"
	}
});
