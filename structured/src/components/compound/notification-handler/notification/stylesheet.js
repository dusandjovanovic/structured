import {
    primaryColor,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    primaryBoxShadow,
    infoBoxShadow,
    successBoxShadow,
    warningBoxShadow,
    dangerBoxShadow,
    container
} from "../../../../assets/stylesheet";

export const styles = () => ({
    '@keyframes animate': {
        from: {
            opacity: 0,
            transform: "translate3d(0, -3000px, 0)"
        },
        '0%': {
            opacity: 0,
            transform: "translate3d(0, -3000px, 0)"
        },
        '60%': {
            opacity: 1,
            transform: "translate3d(0, 25px, 0)"
        },
        '75%': {
            transform: "translate3d(0, -10px, 0)"
        },
        '90%': {
            transform: "translate3d(0, 5px, 0)"
        },
        to: {
            transform: "translate3d(0, 0, 0)"
        }
    },
    holder: {
        animationName: 'animate',
        animationDuration: '1.5s'
    },
    root: {
        position: "relative",
        padding: "1rem 1rem",
        lineHeight: "2rem",
        margin: "0rem 1rem 0rem 1rem",
        fontSize: "1rem",
        borderRadius: "2px",
        boxShadow:
            "0 12px 20px -10px rgba(255, 255, 255, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 255, 255, 0.2)",
        '&:first-child': {
            marginTop: "1rem"
        },
        '&:last-child': {
            marginBottom: "1.5rem"
        }
    },
    info: {
        backgroundColor: infoColor,
        color: "#ffffff",
        ...infoBoxShadow
    },
    success: {
        backgroundColor: successColor,
        color: "#ffffff",
        ...successBoxShadow
    },
    warning: {
        backgroundColor: warningColor,
        color: "#ffffff",
        ...warningBoxShadow
    },
    danger: {
        backgroundColor: dangerColor,
        color: "#ffffff",
        ...dangerBoxShadow
    },
    primary: {
        backgroundColor: primaryColor,
        color: "#ffffff",
        ...primaryBoxShadow
    },
    message: {
        padding: "0",
        maxWidth: "89%"
    },
    close: {
        width: "14px",
        height: "14px",
        display: "inline-block"
    },
    icon: {
        height: "2rem",
        display: "inline-block",
        float: "left",
        marginRight: "1rem"
    },
    container: {
        ...container,
        position: "relative"
    }
});
