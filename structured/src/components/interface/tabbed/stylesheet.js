export const styles = theme => ({
    appBar: {
        height: "54px",
        top: "64px",
        left: 0,
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        alignItems: "center",
        zIndex: 999,
        opacity: 1,
        transition: "opacity 0.25s ease-in-out"
    },
    tabsIndicator: {
        backgroundColor: theme.palette.ternary.main
    },
    tabRoot: {
        textTransform: "initial",
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: "1rem",
        "&:hover": {
            color: theme.palette.ternary.light,
            opacity: 1
        },
        "&$tabSelected": {
            color: "#fbf9ff"
        }
    },
    tabSelected: {},
    typography: {
        padding: "1rem"
    }
});
