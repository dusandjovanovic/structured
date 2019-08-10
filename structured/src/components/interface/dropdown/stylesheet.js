import {primaryBoxShadow} from "../../../assets/stylesheet";

export const styles = (theme) => ({
    popperClose: {
        pointerEvents: "none"
    },
    popperResponsive: {
        zIndex: "1200",
        [theme.breakpoints.down("sm")]: {
            zIndex: "1640",
            position: "static",
            float: "none",
            width: "auto",
            marginTop: "0",
            backgroundColor: "transparent",
            border: "0",
            boxShadow: "none",
            color: "black"
        }
    },
    dropdown: {
        borderRadius: "3px",
        border: "0",
        boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.26)",
        top: "100%",
        zIndex: "1000",
        minWidth: "30rem",
        maxWidth: "40rem",
        padding: "5px 0",
        margin: "2px 0 0",
        fontSize: "14px",
        textAlign: "left",
        listStyle: "none",
        backgroundColor: "#fff",
        backgroundClip: "padding-box",
        [theme.breakpoints.down("sm")]: {
            minWidth: "20rem"
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
        display: "block",
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
        display: "block",
        padding: "0.1875rem 1.25rem",
        fontSize: "0.75rem",
        lineHeight: "1.428571",
        color: "#777",
        fontWeight: "inherit",
        marginTop: "10px",
        "&:hover,&:focus": {
            backgroundColor: "transparent",
            cursor: "auto"
        }
    },
    label: {
        height: "auto",
        wordWrap: "break-word"
    }
});