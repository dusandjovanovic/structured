export const styles = (theme) => ({
    grid: {
        width: "100%",
        margin: "1rem 0rem",
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "flex-start"
    },
    gridItem: {
        flexBasis: "33%",
        padding: "0.75rem",
        position: "relative",
        boxSizing: "border-box",
        [theme.breakpoints.down("md")]: {
            flexBasis: "33%"
        },
        [theme.breakpoints.down("sm")]: {
            flexBasis: "100%"
        }
    }
});