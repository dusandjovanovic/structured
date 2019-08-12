import React from "react";
import GraphLogger from "./graph-logger/graphLogger";
import Grid from "@material-ui/core/Grid";
import * as d3 from "d3";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

class Graph extends React.Component {
    simulation = null;

    constructor(props) {
        super(props);
        this.simulation = d3
            .forceSimulation()
            .force("charge", d3.forceManyBody().strength(-500))
            .force(
                "link",
                d3
                    .forceLink()
                    .distance(250)
                    .id(function id(node) {
                        return node.key;
                    })
            )
            .force("x", d3.forceX(this.props.width / 2))
            .force("y", d3.forceY(this.props.height / 2))
            .force(
                "center",
                d3.forceCenter(this.props.width / 2, this.props.height / 2)
            );
        this.simulation.on("tick", () => {
            // after force calculation starts, call
            // forceUpdate on the React component on each tick
            this.forceUpdate();
        });
    }

    componentDidUpdate(prevProps, prevState, nextProps) {
        if (this.props.graphAnimated !== prevProps.graphAnimated) {
            // d3's force function has side-effects and
            // mutates the nodes and links array directly
            // this.props.nodes/links will contain x and y values
            this.simulation.nodes(this.props.visualization.nodes);
            this.simulation.force("link").links(this.props.visualization.edges);
            this.simulation.alpha(1);
            this.simulation.restart();
            this.props.graphAnimatedEnded();
        }
    }

    componentWillUnmount() {
        this.simulation.stop();
    }

    render() {
        const { classes } = this.props;
        // react for rendering
        // d3 for calculating x and y (muttable)
        let nodes = this.props.visualization.nodes.map(node => {
            let assignClass = this.chromaticVisualization(node, false, classes);
            let transform = "translate(" + node.x + "," + node.y + ")";
            return (
                <g
                    className={classNames(classes.node, assignClass)}
                    key={node.key}
                    transform={transform}
                >
                    <circle
                        onClick={() => this.props.handlerNodeSelected(node)}
                        onMouseEnter={() => this.props.handlerNodeFocused(node)}
                        onMouseLeave={() =>
                            this.props.handlerNodeLostFocus(node)
                        }
                        r={20}
                    />
                    <text x={25} dy=".35em">
                        {node.key}
                    </text>
                </g>
            );
        });
        let links = this.props.visualization.edges.map(link => {
            let assignClass = this.chromaticVisualization(
                link.source,
                true,
                classes
            );
            let arrow = "url(#arrowhead)";
            if (
                assignClass.includes(classes.focused) ||
                assignClass.includes(classes.selected)
            )
                arrow = "url(#focusedArrowhead)";
            else if (assignClass.includes(classes.unfocused))
                arrow = "url(#unfocusedArrowhead)";
            else if (assignClass.includes(classes.clicked))
                arrow = "url(#clickedArrowhead)";
            return (
                <line
                    className={classNames(classes.edge, assignClass)}
                    markerEnd={arrow}
                    key={link.key}
                    strokeWidth={2}
                    x1={link.source.x}
                    x2={link.target.x}
                    y1={link.source.y}
                    y2={link.target.y}
                />
            );
        });

        return (
            <Grid container>
                <Grid item xs={9} className={classes.root}>
                    <svg
                        className={classNames({
                            [classes.crosshair]: this.props.graphManaged
                        })}
                        width="100%"
                        viewBox="0 0 800 600"
                        onClick={() => this.props.handlerViewport()}
                    >
                        <defs>
                            <marker
                                id="arrowhead"
                                viewBox="0 -5 10 10"
                                refX="28"
                                refY="0"
                                orient="auto"
                                markerWidth="6"
                                markerHeight="6"
                            >
                                <path
                                    d="M0,-5L10,0L0,5"
                                    fill="#e0e0e0"
                                    style={{ stroke: "none" }}
                                />
                            </marker>
                            <marker
                                id="focusedArrowhead"
                                viewBox="0 -5 10 10"
                                refX="28"
                                refY="0"
                                orient="auto"
                                markerWidth="6"
                                markerHeight="6"
                            >
                                <path
                                    d="M0,-5L10,0L0,5"
                                    fill="#94d6e9"
                                    style={{ stroke: "none" }}
                                />
                            </marker>
                            <marker
                                id="unfocusedArrowhead"
                                viewBox="0 -5 10 10"
                                refX="28"
                                refY="0"
                                orient="auto"
                                markerWidth="6"
                                markerHeight="6"
                            >
                                <path
                                    d="M0,-5L10,0L0,5"
                                    fill="#f0f0f0"
                                    style={{ stroke: "none" }}
                                />
                            </marker>
                            <marker
                                id="clickedArrowhead"
                                viewBox="0 -5 10 10"
                                refX="28"
                                refY="0"
                                orient="auto"
                                markerWidth="6"
                                markerHeight="6"
                            >
                                <path
                                    d="M0,-5L10,0L0,5"
                                    fill="#e6b8ff"
                                    style={{ stroke: "none" }}
                                />
                            </marker>
                        </defs>
                        <g>
                            {links}
                            {nodes}
                        </g>
                    </svg>
                </Grid>
                <Grid item xs={3}>
                    <GraphLogger
                        nodeSelected={this.props.nodeSelected}
                        nodeCurrent={this.props.nodeCurrent}
                        nodeRoot={this.props.nodeRoot}
                        nodesHighlighted={this.props.nodesHighlighted}
                        nodesAdjacent={this.props.nodesAdjacent}
                        algorithm={this.props.algorithm}
                        algorithmType={this.props.algorithmType}
                        algorithmState={this.props.algorithmState}
                    />
                </Grid>
            </Grid>
        );
    }

    chromaticVisualization = (node, edge, classes) => {
        let assign = "";
        if (this.props.algorithmState) {
            if (node.key === this.props.algorithmState.tempVertex)
                assign = classes.selected;
            else if (node.key === this.props.algorithmState.unvisitedVertex)
                assign = classes.visited;
            else if (this.props.algorithmState.solution.includes(node.key))
                assign = classes.clicked;
        } else if (!this.props.graphManaged && this.props.nodeSelected) {
            if (node.key === this.props.nodeSelected.key)
                assign = classes.selected;
            else if (!edge) {
                node.inEdges.map(source => {
                    if (source === this.props.nodeSelected.key)
                        return (assign = classes.adjacent);
                    else return assign;
                });
            }
        } else if (!this.props.graphManaged && this.props.nodeFocused) {
            if (node.key === this.props.nodeFocused.key)
                assign = classes.focused;
            else {
                assign = classes.unfocused;
                if (!edge) {
                    node.inEdges.map(source => {
                        if (source === this.props.nodeFocused.key)
                            return (assign = classes.focused);
                        else return assign;
                    });
                }
            }
        } else if (
            this.props.graphManaged &&
            this.props.nodesHighlighted.includes(node.key)
        ) {
            assign = classes.clicked;
        }
        return assign;
    };
}

export default withStyles(styles)(Graph);
