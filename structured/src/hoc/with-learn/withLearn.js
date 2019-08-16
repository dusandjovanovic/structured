import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Learn from "../../containers/room/toolbar/toolbar-learn/learn";
import PropTypes from "prop-types";

import {
    GRAPH_LEARN_GRAPHS,
    GRAPH_LEARN_REPRESENTATIONS,
    GRAPH_LEARN_TRAVERSALS
} from "../../utils/constants";

const withLearn = WrappedComponent => {
    class WithLearn extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                redirect: false
            };
        }

        deleteRoomIOInit = async () => {
            try {
                await this.props.roomDeleteExisting();
                this.setState({
                    redirect: true
                });
            } catch (error) {}
        };

        leaveRoomIOInit = async () => {
            try {
                await this.props.roomLeaveExisting(false);
                this.setState({
                    redirect: true
                });

                return "unloading";
            } catch (error) {}
        };

        graphLearn = segment => {
            switch (segment) {
                case GRAPH_LEARN_GRAPHS: {
                    return (
                        <Grid container style={{ padding: "2rem" }}>
                            <Grid container direction="column">
                                <Typography variant="h6">
                                    What are graphs?
                                </Typography>
                                <Typography variant="body1">
                                    In computer science, a graph is an{" "}
                                    <strong>abstract data type</strong> that is
                                    meant to implement the undirected graph and
                                    directed graph concepts from mathematics,
                                    specifically the field of graph theory. A
                                    graph data structure consists of a{" "}
                                    <strong>
                                        finite (and possibly mutable) set of
                                        vertices
                                    </strong>{" "}
                                    or nodes or points, together with a set of
                                    unordered pairs of these vertices for an
                                    undirected graph or a set of ordered pairs
                                    for a directed graph. These{" "}
                                    <strong>pairs are known as edges</strong>,
                                    arcs, or lines for an undirected graph and
                                    as arrows, directed edges, directed arcs, or
                                    directed lines for a directed graph. The
                                    vertices may be part of the graph structure,
                                    or may be external entities represented by
                                    integer indices or references. A graph data
                                    structure may also associate to each edge
                                    some edge value, such as a symbolic label or
                                    a numeric attribute (cost, capacity, length,
                                    etc.).
                                </Typography>
                            </Grid>
                            <hr />
                            <Grid container direction="column">
                                <Typography variant="body1">
                                    The basic operations provided by a graph
                                    data structure G usually include:
                                </Typography>
                                <Typography variant="caption">
                                    <mark>adjacent(G, x, y):</mark> tests
                                    whether there is an edge from the vertex x
                                    to the vertex y;
                                </Typography>
                                <Typography variant="caption">
                                    <mark>neighbors(G, x):</mark> lists all
                                    vertices y such that there is an edge from
                                    the vertex x to the vertex y;
                                </Typography>
                                <Typography variant="caption">
                                    <mark>add_vertex(G, x):</mark> adds the
                                    vertex x, if it is not there;
                                </Typography>
                                <Typography variant="caption">
                                    <mark>remove_vertex(G, x):</mark> removes
                                    the vertex x, if it is there;
                                </Typography>
                                <Typography variant="caption">
                                    <mark>add_edge(G, x, y):</mark> adds the
                                    edge from the vertex x to the vertex y, if
                                    it is not there;
                                </Typography>
                                <Typography variant="caption">
                                    <mark>remove_edge(G, x, y):</mark> removes
                                    the edge from the vertex x to the vertex y,
                                    if it is there;
                                </Typography>
                                <Typography variant="caption">
                                    <mark>get_vertex_value(G, x):</mark> returns
                                    the value associated with the vertex x;
                                </Typography>
                                <Typography variant="caption">
                                    <mark>set_vertex_value(G, x, v):</mark> sets
                                    the value associated with the vertex x to v.
                                </Typography>
                            </Grid>
                            <Typography variant="caption">
                                as said on{" "}
                                <cite title="Source Title">Wikipedia</cite>
                            </Typography>
                        </Grid>
                    );
                }
                case GRAPH_LEARN_REPRESENTATIONS: {
                    return (
                        <Grid container style={{ padding: "2rem" }}>
                            <Grid container direction="column">
                                <Typography variant="h6">
                                    Adjacency list
                                </Typography>
                                <Typography variant="body1">
                                    Vertices are stored as records or objects,
                                    and every vertex stores a list of adjacent
                                    vertices. This data structure allows the
                                    storage of additional data on the vertices.
                                    Additional data can be stored if edges are
                                    also stored as objects, in which case each
                                    vertex stores its incident edges and each
                                    edge stores its incident vertices.
                                </Typography>
                            </Grid>
                            <Grid container direction="column">
                                <Typography variant="h6">
                                    Incidence matrix
                                </Typography>
                                <Typography variant="body1">
                                    A two-dimensional Boolean matrix, in which
                                    the rows represent the vertices and columns
                                    represent the edges. The entries indicate
                                    whether the vertex at a row is incident to
                                    the edge at a column.
                                </Typography>
                            </Grid>
                            <Typography variant="caption">
                                as said on{" "}
                                <cite title="Source Title">Wikipedia</cite>
                            </Typography>
                        </Grid>
                    );
                }
                case GRAPH_LEARN_TRAVERSALS: {
                    return (
                        <Grid container style={{ padding: "2rem" }}>
                            <Grid
                                container
                                direction="column"
                                style={{ marginBottom: "1rem" }}
                            >
                                <Typography variant="h6">
                                    Breadth-first search
                                </Typography>
                                <Typography variant="body1">
                                    A depth-first search (DFS) is an algorithm
                                    for <em>traversing a finite graph</em>. DFS
                                    visits the child vertices before visiting
                                    the sibling vertices; that is, it traverses
                                    the{" "}
                                    <em>
                                        depth of any particular path before
                                        exploring its breadth
                                    </em>
                                    . A stack (often the programs call stack via
                                    recursion) is generally used when
                                    implementing the algorithm.
                                    <mark>
                                        The algorithm begins with a chosen root
                                        vertex; it then iteratively transitions
                                        from the current vertex to an adjacent,
                                        unvisited vertex, until it can no longer
                                        find an unexplored vertex to transition
                                        to from its current location.
                                    </mark>{" "}
                                    The algorithm then backtracks along
                                    previously visited vertices, until it finds
                                    a vertex connected to yet more uncharted
                                    territory. It will then proceed down the new
                                    path as it had before, backtracking as it
                                    encounters dead-ends, and ending only when
                                    the algorithm has backtracked past the
                                    original root vertex from the very first
                                    step. DFS is the basis for many
                                    graph-related algorithms, including
                                    topological sorts and planarity testing.
                                </Typography>
                                <code>
                                    1 procedure DFS(G, v):
                                    <br />
                                    2 label v as explored
                                    <br />
                                    3 for all edges e in G.incidentEdges(v) do
                                    <br />
                                    4 if edge e is unexplored then
                                    <br />
                                    5 w ← G.adjacentVertex(v, e)
                                    <br />
                                    6 if vertex w is unexplored then
                                    <br />
                                    7 label e as a discovered edge
                                    <br />
                                    8 recursively call DFS(G, w)
                                    <br />
                                    9 else
                                    <br />
                                    10 label e as a back edge
                                    <br />
                                </code>
                            </Grid>
                            <Grid
                                container
                                direction="column"
                                style={{ marginBottom: "1rem" }}
                            >
                                <Typography variant="h6">
                                    Depth-first search
                                </Typography>
                                <Typography variant="body1">
                                    A breadth-first search (BFS) is another
                                    technique for traversing a finite graph. BFS
                                    visits the neighbor vertices before visiting
                                    the child vertices, and a queue is used in
                                    the search process. This algorithm is often
                                    used to find the shortest path from one
                                    vertex to another.
                                </Typography>
                                <code>
                                    1 procedure BFS(G, v):
                                    <br />
                                    2 create a queue Q<br />
                                    3 enqueue v onto Q<br />
                                    4 mark v<br />
                                    5 while Q is not empty:
                                    <br />
                                    6 t ← Q.dequeue()
                                    <br />
                                    7 if t is what we are looking for:
                                    <br />
                                    8 return t<br />
                                    9 for all edges e in G.adjacentEdges(t) do
                                    <br />
                                    12 o ← G.adjacentVertex(t, e)
                                    <br />
                                    13 if o is not marked:
                                    <br />
                                    14 mark o<br />
                                    15 enqueue o onto Q<br />
                                    16 return null
                                    <br />
                                </code>
                            </Grid>
                            <Typography variant="caption">
                                as said on{" "}
                                <cite title="Source Title">Wikipedia</cite>
                            </Typography>
                        </Grid>
                    );
                }
                default:
                    return;
            }
        };

        render() {
            return (
                <WrappedComponent
                    learn
                    redirect={this.state.redirect}
                    leaveRoomIOInit={this.leaveRoomIOInit}
                    deleteRoomIOInit={this.deleteRoomIOInit}
                    {...this.props}
                >
                    <Learn
                        randomGraph={this.props.randomGraphOffline}
                        graphLearn={this.graphLearn}
                        leaveRoomIOInit={this.leaveRoomIOInit}
                        deleteRoomIOInit={this.deleteRoomIOInit}
                    />
                </WrappedComponent>
            );
        }
    }

    WithLearn.propTypes = {
        username: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        room: PropTypes.object.isRequired,
        error: PropTypes.string,
        roomLeaveExisting: PropTypes.func.isRequired,
        roomDeleteExisting: PropTypes.func.isRequired,
        roomGetGraph: PropTypes.func.isRequired,
        roomChangeGraph: PropTypes.func.isRequired,
        roomGetData: PropTypes.func.isRequired,
        userHistoryAdd: PropTypes.func.isRequired,
        internalNotificationsAdd: PropTypes.func.isRequired,

        graph: PropTypes.object.isRequired,
        visualization: PropTypes.object.isRequired,
        initiateGraph: PropTypes.func.isRequired,
        randomGraph: PropTypes.func.isRequired,
        randomGraphOffline: PropTypes.func.isRequired,
        addNode: PropTypes.func.isRequired,
        addReceivedNode: PropTypes.func.isRequired,
        removeNode: PropTypes.func.isRequired,
        removeReceivedNode: PropTypes.func.isRequired,
        addEdge: PropTypes.func.isRequired,
        addReceivedEdge: PropTypes.func.isRequired,
        removeEdge: PropTypes.func.isRequired,
        removeReceivedEdge: PropTypes.func.isRequired,
        nodeSelected: PropTypes.object,
        nodeFocused: PropTypes.object,
        nodeCurrent: PropTypes.string,
        nodesHighlighted: PropTypes.arrayOf(PropTypes.string),
        nodesAdjacent: PropTypes.arrayOf(PropTypes.string),
        nodeRoot: PropTypes.string,
        handlerNodeSelected: PropTypes.func.isRequired,
        handlerNodeFocused: PropTypes.func.isRequired,
        handlerNodeLostFocus: PropTypes.func.isRequired,
        handlerViewport: PropTypes.func.isRequired,
        graphManaged: PropTypes.bool.isRequired,
        graphAnimated: PropTypes.bool.isRequired,
        graphOperation: PropTypes.string,
        graphManagedEnded: PropTypes.func.isRequired,
        graphAnimatedEnded: PropTypes.func.isRequired,
        graphManagedAddEdge: PropTypes.func.isRequired,
        graphManagedRemoveNode: PropTypes.func.isRequired,
        graphManagedRemoveEdge: PropTypes.func.isRequired,
        graphManagedAlgorithm: PropTypes.func.isRequired,
        graphManagedAlgorithmEnded: PropTypes.func.isRequired,
        graphManagedCompete: PropTypes.func.isRequired,
        graphNodeRoot: PropTypes.func.isRequired
    };

    return WithLearn;
};

export default withLearn;
