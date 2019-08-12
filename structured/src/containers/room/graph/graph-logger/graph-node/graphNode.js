import React from "react";
import Grid from "@material-ui/core/Grid";

const graphNode = props => {
    return (
        <Grid item xs={12} className={props.holderClass}>
            <span>{props.text}</span>
            {props.node ? (
                <span className={props.nodeClass}>{props.node}</span>
            ) : (
                <span className={props.nodeUndefined}>NULL</span>
            )}
        </Grid>
    );
};

export default React.memo(graphNode);
