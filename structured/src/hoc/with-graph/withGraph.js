import React from 'react';
import {graphFactory} from "../../utils/graph-module/graph.module";
import randomData from "../../utils/graph-module/graph.random";

const GRAPH_MANAGED_REMOVE_NODE = 'GRAPH_MANAGED_REMOVE_NODE';
const GRAPH_MANAGED_ADD_EDGE = 'GRAPH_MANAGED_ADD_EDGE';
const GRAPH_MANAGED_REMOVE_EDGE = 'GRAPH_MANAGED_REMOVE_EDGE';
const GRAPH_MANAGED_ALGORITHM = 'GRAPH_MANAGED_ALGORITHM';

function withGraph(WrappedComponent) {
    return class extends React.Component {
        graph = new graphFactory();

        state = {
            graph: null,
            graphManaged: false,
            graphAnimated: false,
            graphOperation: null,
            nodeFocused: null,
            nodeSelected: null,
            nodeCurrent: null,
            nodeRoot: null,
            nodesHighlighted: []
        };

        graphManaged = () => {
            this.setState({
                graphManaged: true
            });
        };

        graphManagedEnded = () => {
            this.setState({
                graphManaged: false
            });
        };

        graphAnimated = () => {
            this.setState({
                graphAnimated: true
            });
        };

        graphAnimatedEnded = () => {
            this.setState({
                graphAnimated: false
            });
        };

        graphManagedRemoveNode = () => {
            this.setState({
                graphManaged: true,
                graphOperation: GRAPH_MANAGED_REMOVE_NODE,
                nodeSelected: null,
                nodesHighlighted: []
            });
        };

        graphManagedAddEdge = () => {
            this.setState({
                graphManaged: true,
                graphOperation: GRAPH_MANAGED_ADD_EDGE,
                nodeSelected: null,
                nodesHighlighted: []
            });
        };

        graphManagedRemoveEdge = () => {
            this.setState({
                graphManaged: true,
                graphOperation: GRAPH_MANAGED_REMOVE_EDGE,
                nodeSelected: null,
                nodesHighlighted: []
            });
        };

        graphManagedAlgorithm = () => {
            this.setState({
                graphManaged: true,
                graphOperation: GRAPH_MANAGED_ALGORITHM,
                nodeSelected: null,
                nodesHighlighted: []
            });
        };

        graphManagedAlgorithmEnded = () => {
            this.setState({
                graphManaged: false,
                graphOperation: null,
                nodeSelected: null,
                nodesHighlighted: []
            });
        };

        graphNodeSelected = (node) => {
            this.setState({
                nodeSelected: node
            });
        };

        graphNodeHighlighted = (nodesHighlighted) => {
            this.setState({
                nodesHighlighted: nodesHighlighted
            });
        };

        graphNodeFocused = (node) => {
            this.setState({
                nodeFocused: node
            });
        };

        handlerNodeSelected = (node) => {
            if (this.state.graphManaged) {
                let updated = this.state.nodesHighlighted.slice();
                updated.includes(node.key)
                    ? updated.splice(updated.indexOf(node.key), 1)
                    : updated.push(node.key);
                this.graphNodeHighlighted(updated);

                switch (this.state.graphOperation) {
                    case GRAPH_MANAGED_ADD_EDGE: {
                        if (updated.length === 2)
                            this.addEdge(updated[0], updated[1]);
                        break;
                    }
                    case GRAPH_MANAGED_REMOVE_EDGE: {
                        if (updated.length === 2)
                            this.removeEdge(updated[0], updated[1]);
                        break;
                    }
                    case GRAPH_MANAGED_REMOVE_NODE: {
                        this.removeNode(updated[0]);
                        break;
                    }
                    default:
                        return;
                }
            }
            else if (!this.state.nodeSelected) {
                this.graphNodeSelected(node);
                this.graphNodeFocused(null);
            }
            else {
                this.graphNodeSelected(null);
                this.graphNodeFocused(null);
            }
        };

        handlerNodeFocused = (node) => {
            if (!this.state.graphManaged && !this.state.nodeSelected)
                this.graphNodeFocused(node);
        };

        handlerNodeLostFocus = () => {
            if (!this.state.graphManaged)
                this.graphNodeFocused(null);
        };

        handlerViewport = () => {
            if (!this.state.graphManaged && this.state.nodeSelected) {
                this.graphNodeSelected(null);
                this.graphNodeFocused(null);
            }
        };

        managedEnded = () => {
            this.setState({
                graph: this.graph.getGraph(),
                nodeSelected: null,
                nodesHighlighted: []
            });
            this.graphManagedEnded();
        };

        initiateGraph = (graph) => {
            if (graph) {
                this.graph = new graphFactory();
                graph.nodes.map(node => {
                    return this.graph.addVertex(node.key);
                });
                graph.edges.map(edge => {
                    return this.graph.addEdge(edge.source.key, edge.target.key);
                });
                this.managedEnded();
                this.graphAnimated();
            }
        };

        randomGraph = () => {
            let randomGraph = randomData();
            this.initiateGraph(randomGraph);
        };

        addNode = () => {
            let node = this.graph.addVertexRandom();
            this.props.addNodeIO(node);
            this.managedEnded();
            this.graphAnimated();
        };

        addNodeValue = (node) => {
            this.graph.addVertex(node);
            this.managedEnded();
            this.graphAnimated();
        };

        removeNode = (node) => {
            this.graph.removeVertex(node);
            this.managedEnded();
            this.graphAnimated();
        };

        addEdge = (source, target) => {
            this.graph.addEdge(source, target);
            this.managedEnded();
            this.graphAnimated();
        };

        removeEdge = (source, target) => {
            this.graph.removeEdge(source, target);
            this.managedEnded();
            this.graphAnimated();
        };

        render() {
            const proxyPropagate = {
                graph: this.graph,
                visualization: this.graph.visualization,

                initiateGraph: this.initiateGraph,
                randomGraph: this.randomGraph,
                addNode: this.addNode,
                addNodeValue: this.addNodeValue,
                removeNode: this.removeNode,
                addEdge: this.addEdge,
                removeEdge: this.removeEdge,

                nodeSelected: this.state.nodeSelected,
                nodeFocused: this.state.nodeFocused,
                nodeCurrent: this.state.nodeCurrent,
                nodesHighlighted: this.state.nodesHighlighted,
                nodeRoot: this.state.nodeRoot,

                handlerNodeSelected: this.handlerNodeSelected,
                handlerNodeFocused: this.handlerNodeFocused,
                handlerNodeLostFocus: this.handlerNodeLostFocus,
                handlerViewport: this.handlerViewport,

                graphManaged: this.state.graphManaged,
                graphAnimated: this.state.graphAnimated,
                graphOperation: this.state.graphOperation,
                graphAnimatedEnded: this.graphAnimatedEnded,
                graphManagedAddEdge: this.graphManagedAddEdge,
                graphManagedRemoveNode: this.graphManagedRemoveNode,
                graphManagedRemoveEdge: this.graphManagedRemoveEdge,
                graphManagedAlgorithm: this.graphManagedAlgorithm,
                graphManagedAlgorithmEnded: this.graphManagedAlgorithmEnded
            };
            return <WrappedComponent {...proxyPropagate} {...this.props} />
        }
    }
}

export default withGraph;