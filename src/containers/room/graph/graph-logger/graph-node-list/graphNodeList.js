import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

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

graphNodeList.propTypes = {
    text: PropTypes.string,
    node: PropTypes.string,
    nodes: PropTypes.arrayOf(PropTypes.string),
    holderClass: PropTypes.string,
    nodeClass: PropTypes.string,
    nodeUndefined: PropTypes.string
};

export default React.memo(graphNodeList);
