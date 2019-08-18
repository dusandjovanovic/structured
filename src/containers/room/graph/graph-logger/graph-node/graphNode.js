import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

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

graphNode.propTypes = {
    text: PropTypes.string,
    node: PropTypes.string,
    holderClass: PropTypes.string,
    nodeClass: PropTypes.string,
    nodeUndefined: PropTypes.string
};

export default React.memo(graphNode);
