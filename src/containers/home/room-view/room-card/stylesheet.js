export const styles = theme => ({
	card: {
		flex: "1",
		margin: "0rem 0.5rem",
		boxShadow: "1px 0px 10px rgba(122, 122, 122, 0.2)",
		transition: "all 0.25s ease-in-out",
		borderRadius: "0.4rem",
		"&:hover": {
			boxShadow: "1px 0px 18px rgba(0, 188, 212, 0.2)"
		},
		"&:last-child": {
			marginRight: 0
		},
		"&:first-child": {
			marginLeft: 0
		}
	},
	content: {
		backgroundColor: "#fdfdff",
		padding: "1rem 1.5rem",
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		borderBottom: "1px solid rgba(122, 122, 122, 0.1)"
	},
	details: {
		textAlign: "center",
		padding: "1rem"
	},
	time: {
		width: "100%",
		padding: "0.5rem",
		marginBottom: "1rem",
		textAlign: "center",
		color: "#44484b",
		fontWeight: "normal",
		backgroundColor: "rgba(240, 244, 195, 0.6)"
	},
	attending: {
		width: "100%",
		padding: "1rem",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center"
	},
	actions: {
		cursor: "pointer",
		borderTop: "1px solid rgba(122, 122, 122, 0.1)",
		padding: "1rem",
		textAlign: "center",
		"&:hover": {
			backgroundColor: theme.palette.primary.light,
			color: "#fff"
		}
	},
	actionsText: {
		margin: "auto",
		fontSize: "1rem",
		fontWeight: "normal",
		pointerEvents: "none",
		color: "inherit"
	},
	title: {
		fontSize: 18,
		fontWeight: "normal",
		color: "#323c47",
		marginBottom: "0.25rem"
	},
	subtitle: {
		fontSize: 16,
		fontWeight: "normal",
		color: "#71757a"
	},
	occupied: {
		position: "absolute",
		padding: "inherit",
		top: "0.75rem",
		left: "0.75rem",
		width: "calc(100% - 1.5rem)",
		height: "calc(100% - 1.5rem)",
		backgroundColor: "rgba(255,220,112, 0.6)",
		backgroundImage:
			"repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,220,112,.4) 35px, rgba(255,220,112,.4) 70px)",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "0.4rem"
	},
	occupiedTitle: {
		fontWeight: "normal"
	}
});
