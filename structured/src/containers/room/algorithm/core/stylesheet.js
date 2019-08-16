export const styles = () => ({
    root: {
        maxWidth: "620px",
        animationName: "$fadeIn",
        animationDuration: "1s",
        fontFamily:
            "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
        fontSize: "1.25rem",
        background: "#ffffff",
        opacity: 0.9,
        border: "1px solid #152434",
        boxShadow: "2px 2px 3px 2px #7d7d7d",
        textAlign: "left",
        position: "absolute",
        userSelect: "none",
        top: "30%",
        left: "5%"
    },
    syntax: {
        padding: "0.5rem 1.5rem 0.5rem 1.5rem"
    },
    "@keyframes fadeIn": {
        from: { opacity: 0 },
        to: { opacity: 0.8 }
    }
});
