import React from "react";
import GraphNode from "./graph-node/graphNode";
import GraphNodeList from "./graph-node-list/graphNodeList";
import Grid from "@material-ui/core/Grid";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import {
    ALGORITHM_BREADTH_OBSERVABLE,
    ALGORITHM_DEPTH_OBSERVABLE
} from "../../../../utils/constants";

const graphLogger = props => {
    
    const { classes } = props;

    return (
        <Grid container className={classes.root}>
            <GraphNode
                text="Selected:"
                show={props.nodeSelected && props.nodeSelected.key}
                node={props.nodeSelected ? props.nodeSelected.key : null}
                holderClass={classNames(classes.holder, classes.selectedText)}
                nodeClass={classNames(classes.node, classes.selected)}
            />

            <GraphNodeList
                text="Adjacent:"
                nodes={props.nodesAdjacent}
                holderClass={classNames(classes.holder, classes.primaryText)}
                nodeClass={classNames(classes.node, classes.adjacent)}
            />

            <GraphNode
                show
                text="Root:"
                node={props.nodeRoot}
                holderClass={classNames(classes.holder, classes.primaryAltText)}
                nodeClass={classes.node}
            />

            <GraphNodeList
                text="Highlighted:"
                nodes={props.nodesHighlighted}
                holderClass={classNames(classes.holder, classes.primaryAltText)}
                nodeClass={classNames(classes.node, classes.watched)}
            />

            {props.algorithmState ? (
                <div>
                    <hr className={classes.separator} />

                    <GraphNode
                        text="Current:"
                        show={
                            props.algorithmState &&
                            props.algorithmState.tempVertex
                        }
                        node={props.algorithmState.tempVertex}
                        holderClass={classNames(
                            classes.holder,
                            classes.primaryText
                        )}
                        nodeClass={classNames(classes.node, classes.selected)}
                    />

                    <GraphNode
                        text="Unvisited:"
                        show={
                            props.algorithmState &&
                            props.algorithmState.unvisitedVertex
                        }
                        node={props.algorithmState.unvisitedVertex}
                        holderClass={classNames(
                            classes.holder,
                            classes.primaryText
                        )}
                        nodeClass={classes.node}
                    />

                    <GraphNodeList
                        text="Visited:"
                        nodes={props.algorithmState.visited}
                        holderClass={classNames(
                            classes.holder,
                            classes.primaryAltText
                        )}
                        nodeClass={classes.node}
                    />

                    <GraphNodeList
                        text="Traversed:"
                        nodes={props.algorithmState.solution}
                        holderClass={classNames(
                            classes.holder,
                            classes.primaryAltText
                        )}
                        nodeClass={classNames(classes.node, classes.watched)}
                    />
                </div>
            ) : null}
            {props.algorithmState &&
            props.algorithmType === ALGORITHM_BREADTH_OBSERVABLE ? (
                <GraphNodeList
                    text="Queue:"
                    nodes={props.algorithmState.structure}
                    holderClass={classNames(
                        classes.holder,
                        classes.primaryAltText
                    )}
                    nodeClass={classes.node}
                />
            ) : null}
            {props.algorithmState &&
            props.algorithmType === ALGORITHM_DEPTH_OBSERVABLE ? (
                <GraphNodeList
                    text="Stack:"
                    nodes={props.algorithmState.structure}
                    holderClass={classNames(
                        classes.holder,
                        classes.primaryAltText
                    )}
                    nodeClass={classes.node}
                />
            ) : null}
        </Grid>
    );
};

export default withStyles(styles)(React.memo(graphLogger));
