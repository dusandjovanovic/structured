export const styles = theme => ({
    appBar: {
        backgroundColor: theme.palette.background.paper,
        height: "64px",
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
    appBarTransparent: {
        opacity: 0.9
    }
});