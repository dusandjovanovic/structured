export const styles = (theme) => ({
    container: {
        minWidth: 0,
        flex: "1",
        margin: "0rem 0.5rem",
        transition: "all 0.25s ease-in-out",
        boxShadow: "1px 0px 10px rgba(122, 122, 122, 0.2)",
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
    children: {
        padding: "0.25rem",
        width: "100%",
        height: "100%"
    },
    title: {
        margin: "0.75rem 2rem",
        fontWeight: 350
    },
    horizontalLine: {
        width: "90%",
        height: "1px",
        border: 0,
        backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0))"
    }
});