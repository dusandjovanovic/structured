export const styles = theme => ({
    content: {
        width: "40%",
        margin: "2rem auto",
        textAlign: "center",
        boxShadow: "0 2px 3px #ccc",
        border: "1px solid #eee",
        boxSizing: "border-box",
        [theme.breakpoints.down("md")]: {
            width: "70%"
        },
        [theme.breakpoints.down("sm")]: {
            width: "90%"
        }
    },
    inputs: {
        paddingLeft: "4rem",
        paddingRight: "4rem",
        paddingBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.down("md")]: {
            paddingLeft: "2rem",
            paddingRight: "2rem"
        },
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "1rem",
            paddingRight: "1rem"
        }
    },
    borderline: {
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        boxShadow: "0 1px 1px #ccc"
    },
    borderlineContent: {
        color: "#fff",
        marginTop: 20
    },
    horizontalLine: {
        width: "90%",
        height: "1px",
        border: 0,
        backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0))"
    },
    button: {
        margin: "1rem"
    },
    buttonBottom: {
        margin: "1.5rem"
    },
    buttonHeadline: {
        margin: "1rem"
    },
    textField: {
        margin: "2rem"
    },
    override: {
        color: theme.palette.ternary.main
    }
});
