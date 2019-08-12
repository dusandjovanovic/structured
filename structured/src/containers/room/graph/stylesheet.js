import { graphColors } from "../../../assets/stylesheet";

export const styles = () => ({
    root: {
        border: "1px solid #d1d1d1"
    },
    crosshair: {
        cursor: "crosshair"
    },
    node: {
        "& circle": {
            fill: graphColors.node.fill,
            stroke: graphColors.node.stroke,
            strokeWidth: "2.5px"
        },
        "& text": {
            fill: graphColors.node.text,
            stroke: "none",
            fontSize: ".7rem"
        }
    },
    edge: {
        stroke: graphColors.edge.stroke,
        strokeOpacity: 0.6
    },
    adjacent: {
        stroke: graphColors.adjacent.fill,
        "& circle": {
            fill: graphColors.adjacent.fill,
            stroke: graphColors.adjacent.stroke
        },
        "& text": {
            fill: graphColors.adjacent.text
        }
    },
    clicked: {
        stroke: graphColors.clicked.fill,
        "& circle": {
            fill: graphColors.clicked.fill,
            stroke: graphColors.clicked.stroke
        },
        "& text": {
            fill: graphColors.clicked.text
        }
    },
    visited: {
        stroke: graphColors.visited.fill,
        "& circle": {
            fill: graphColors.visited.fill,
            stroke: graphColors.visited.stroke
        },
        "& text": {
            fill: graphColors.visited.text
        }
    },
    focused: {
        stroke: graphColors.focused.fill,
        "& circle": {
            fill: graphColors.focused.fill,
            stroke: graphColors.focused.stroke
        },
        "& text": {
            fill: graphColors.focused.text
        }
    },
    selected: {
        stroke: graphColors.selected.fill,
        "& circle": {
            fill: graphColors.selected.fill,
            stroke: graphColors.selected.stroke
        },
        "& text": {
            fill: graphColors.selected.text
        }
    },
    unfocused: {
        strokeOpacity: 0.3,
        "& circle": {
            opacity: 0.4,
        },
        "& text": {
            opacity: 0.4,
        }
    }
});