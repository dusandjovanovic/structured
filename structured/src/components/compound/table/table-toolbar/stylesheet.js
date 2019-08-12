import { lighten } from "@material-ui/core/styles/colorManipulator";

export const styles = theme => ({
    root: {
        paddingRight: "0.25rem"
    },
    highlight:
        theme.palette.type === "light"
            ? {
                  color: theme.palette.primary.main,
                  backgroundColor: lighten(theme.palette.primary.light, 0.85)
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.primary.dark
              },
    spacer: {
        flex: "1 1 100%"
    },
    actions: {
        color: theme.palette.text.primary
    },
    titleContainer: {
        flex: "0 0 auto"
    },
    title: {
        margin: "0.75rem 1rem",
        fontWeight: 350
    }
});
