import { graphColors } from "../../../../assets/stylesheet";

export const styles = () => ({
    root: {
        fontSize: "1.1rem",
        fontFamily: "Consolas, monaco, monospace",
        float: "left",
        width: "auto",
        padding: "0 2rem"
    },
    holder: {
        lineHeight: "1.6rem"
    },
    separator: {
        padding: "1rem"
    },
    node: {
        background: "#33373e",
        color: "#ffffff",
        borderRadius: "0.8rem",
        display: "inline-block",
        fontWeight: "bold",
        lineLeight: "1.6rem",
        marginRight: "10px",
        textAlign: "center",
        width: "1.6rem"
    },
    selected: {
        background: graphColors.selected.fill
    },
    watched: {
        background: graphColors.clicked.fill
    },
    adjacent: {
        background: graphColors.adjacent.fill
    },
    selectedText: {
        color: graphColors.selected.fill
    },
    primaryText: {
        color: graphColors.visited.fill
    },
    primaryAltText: {
        color: graphColors.visited.stroke
    }
});
