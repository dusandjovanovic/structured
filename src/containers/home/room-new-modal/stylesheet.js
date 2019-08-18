export const styles = theme => ({
    content: {
        margin: "2rem auto",
        width: "100%",
        textAlign: "center",
        boxSizing: "border-box"
    },
    inputs: {
        display: "flex",
        padding: "1rem 6rem",
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
    inputsGroup: {
        margin: "2rem",
        display: "flex",
        flexDirection: "row"
    },
    buttonContainer: {
        backgroundColor: "#eeeeee",
        width: "100%",
        height: "4rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        margin: "1.5rem"
    },
    textField: {
        margin: "1.5rem 0rem"
    },
    input: {
        display: "none"
    }
});
