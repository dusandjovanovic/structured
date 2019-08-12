import { graphColors } from "../../../../assets/stylesheet";

export const styles = () => ({
    root: {
        fontSize: "1rem",
        fontFamily:
            "source-code-pro, Menlo, Monaco, Consolas, 'Courier New, monospace",
        float: "left",
        width: "auto",
        padding: "1.5rem"
    },
    holder: {
        lineHeight: "2rem"
    },
    separator: {
        padding: "1rem"
    },
    node: {
        fontSize: "1rem",
        background: "#33373e",
        color: "#ffffff",
        borderRadius: "50%",
        display: "inline-block",
        lineHeight: "1.8rem",
        marginLeft: "0.5rem",
        textAlign: "center",
        width: "1.8rem",
        height: "1.8rem",
        border: "1px solid #dedede"
    },
    nodeUndefined: {
        fontSize: "1rem",
        color: graphColors.visited.stroke,
        fontWeight: "lighter",
        display: "inline-block",
        lineHeight: "1.8rem",
        marginLeft: "0.5rem"
    },
    algorithm: {
        fontSize: "1rem",
        color: graphColors.edge.stroke,
        fontWeight: "lighter",
        display: "inline-block",
        lineHeight: "1.8rem"
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
