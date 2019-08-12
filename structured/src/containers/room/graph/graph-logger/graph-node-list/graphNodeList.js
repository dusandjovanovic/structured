import React from "react";
import Grid from "@material-ui/core/Grid";

const graphNodeList = props => {
    return (
        <Grid item xs={12} className={props.holderClass}>
            <span>{props.text}</span>
            {props.nodes && props.nodes.length ? (
                props.nodes.map(node => (
                    <span key={node} className={props.nodeClass}>
                        {node}
                    </span>
                ))
            ) : (
                <span className={props.nodeUndefined}>NULL</span>
            )}
        </Grid>
    );
};

export default React.memo(graphNodeList);
