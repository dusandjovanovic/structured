export const styles = (theme) => ({
    card: {
        flex: "1",
        margin: "0rem 0.5rem",
        boxShadow: "1px 0px 10px rgba(122, 122, 122, 0.2)",
        transition: "all 0.25s ease-in-out",
        '&:hover': {
            boxShadow: "1px 0px 20px rgba(122, 122, 122, 0.2)"
        },
        '&:last-child': {
            marginRight: 0
        },
        '&:first-child': {
            marginLeft: 0
        },
        [theme.breakpoints.down('md')]: {
            margin: "0.5rem 0rem"
        }
    },
    content: {
        backgroundColor: "#fdfdff",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        backgroundColor: "#fefefe",
        border: "1px solid #f7f7f7",
        borderRadius: "50%",
        padding: "1rem"
    },
    details: {
        marginLeft: "1.75rem"
    },
    actions: {
        borderTop: "1px solid rgba(122, 122, 122, 0.1)",
        padding: "1rem"
    },
    title: {
        fontSize: 18,
        fontWeight: "light"
    },
    subtitle: {
        color: "#4f4f4f",
        fontSize: 22,
        fontWeight: "normal"
    }
});