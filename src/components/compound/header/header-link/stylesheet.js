export const styles = theme => ({
	listItem: {
		float: "left",
		color: "inherit",
		position: "relative",
		display: "block",
		width: "auto",
		margin: "0",
		padding: "0",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
			"&:after": {
				width: "calc(100% - 30px)",
				content: '""',
				display: "block",
				height: "1px",
				marginLeft: theme.spacing(2),
				backgroundColor: "#e5e5e5"
			}
		}
	},
	navLink: {
		color: "inherit",
		position: "relative",
		padding: theme.spacing(1.75),
		fontWeight: "normal",
		fontSize: "12px",
		textTransform: "none",
		borderRadius: "3px",
		lineHeight: "20px",
		textDecoration: "none",
		margin: "0px",
		display: "inline-flex",
		"&:hover,&:focus": {
			color: "inherit",
			background: "rgba(200, 200, 200, 0.2)"
		},
		[theme.breakpoints.down("sm")]: {
			width: "calc(100% - 30px)",
			margin: theme.spacing(1),
			textAlign: "left",
			"& > span:first-child": {
				justifyContent: "flex-start"
			}
		}
	},
	notificationNavLink: {
		color: "inherit",
		padding: theme.spacing(1.75),
		fontWeight: "normal",
		fontSize: "12px",
		textTransform: "uppercase",
		lineHeight: "20px",
		textDecoration: "none",
		margin: "0px",
		display: "inline-flex",
		top: "4px"
	},
	navLinkActive: {
		color: "inherit",
		backgroundColor: "rgba(255, 255, 255, 0.2)"
	},
	icons: {
		width: "20px !important",
		height: "20px !important",
		marginRight: "3px"
	}
});
