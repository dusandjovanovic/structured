export const styles = theme => ({
    root: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        padding: "2rem 4rem",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            padding: "2rem 2rem"
        },
        [theme.breakpoints.down("sm")]: {
            padding: "0.25rem"
        }
    },
    container: {
        width: "100%",
        margin: "0rem 0rem 2rem 0rem",
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column"
        }
    }
});
