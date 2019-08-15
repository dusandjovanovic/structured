import { primaryBoxShadow, shallowShadow } from "../../../assets/stylesheet";

export const styles = theme => ({
    popperClose: {
        pointerEvents: "none"
    },
    popperResponsive: {
        zIndex: "1200",
        maxHeight: "80%",
        overflowY: "auto",
        ...shallowShadow
    },
    dropdown: {
        position: "realtive",
        zIndex: "1201",
        height: "100%",
        borderRadius: "0.2rem",
        width: "35rem",
        padding: "0.5rem 0",
        fontSize: "1.2rem",
        textAlign: "left",
        listStyle: "none",
        backgroundColor: "#fff",
        [theme.breakpoints.down("sm")]: {
            width: "80vw"
        }
    },
    menuList: {
        padding: "0"
    },
    dropdownItem: {
        height: "auto",
        fontSize: "1rem",
        padding: "1rem",
        margin: "0 5px",
        borderRadius: "2px",
        position: "relative",
        transition: "all 150ms linear",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        fontWeight: "400",
        color: "#333",
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "#FFFFFF",
            ...primaryBoxShadow
        }
    },
    dropdownDividerItem: {
        margin: "5px 0",
        backgroundColor: "rgba(0, 0, 0, 0.12)",
        height: "1px"
    },
    buttonIcon: {
        color: "white",
        padding: 0,
        margin: 0
    },
    buttonText: {
        minWidth: 0,
        color: "white",
        padding: "12px 12px",
        borderRadius: "50%"
    },
    dropdownHeader: {
        height: "auto",
        fontSize: "1rem",
        padding: "1rem",
        margin: "0 5px",
        borderRadius: "2px",
        position: "relative",
        transition: "all 150ms linear",
        fontWeight: "400",
        color: "#9e9e9e"
    },
    label: {
        width: "100%",
        height: "auto",
        overflowWrap: "break-word",
        whiteSpace: "normal"
    }
});
