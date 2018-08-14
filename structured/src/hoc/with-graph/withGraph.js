import React from 'react';
import {graphFactory} from "../../utils/graph-module/graph.module";
import randomData from "../../utils/graph-module/graph.random";

const MANAGED_REMOVE_NODE = 'MANAGED_REMOVE_NODE';
const MANAGED_ADD_EDGE = 'MANAGED_ADD_EDGE';
const MANAGED_REMOVE_EDGE = 'MANAGED_REMOVE_EDGE';
const MANAGED_ALGORITHM = 'MANAGED_ALGORITHM';

function withGraph(WrappedComponent) {
    return class extends React.Component {
        graph = new graphFactory();

        state = {
            graph: null,
            graphManaged: false,
            graphOperation: null
        };

        managedAddEdgeHandler = () => {
            this.setState({
                graphManaged: true,
                graphOperation: MANAGED_ADD_EDGE
            });
        };

        managedRemoveNodeHandler = () => {
            this.setState({
                graphManaged: true,
                graphOperation: MANAGED_REMOVE_NODE
            });
        };

        managedRemoveEdgeHandler = () => {
            this.setState({
                graphManaged: true,
                graphOperation: MANAGED_REMOVE_EDGE
            });
        };

        managedAlgorithm = () => {
            this.setState({
                graphManaged: true,
                graphOperation: MANAGED_ALGORITHM
            });
        };

        managedAlgorithmCanceled = () => {
            this.setState({
                graphManaged: false,
                graphOperation: null
            });
        };

        managedCanceled = () => {
            this.setState({
                graph: this.graph.getGraph(),
                graphManaged: false,
                graphOperation: null
            });
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
                this.managedCanceled();
            }
        };

        randomGraph = () => {
            let randomGraph = randomData();
            this.initiateGraph(randomGraph);
        };

        addNode = () => {
            let node = this.graph.addVertexRandom();
            this.managedCanceled();
            this.props.addNodeIO(node);
        };

        addNodeValue = (node) => {
            this.graph.addVertex(node);
            this.managedCanceled();
        };

        removeNode = (node) => {
            this.graph.removeVertex(node);
            this.managedCanceled();
        };

        addEdge = (source, target) => {
            this.graph.addEdge(source, target);
            this.managedCanceled();
        };

        removeEdge = (source, target) => {
            this.graph.removeEdge(source, target);
            this.managedCanceled();
        };

        render() {
            const proxy = {
                graph: this.graph,
                visualization: this.graph.visualization,
                graphManaged: this.state.graphManaged,
                graphOperation: this.state.graphOperation,
                managedAddEdgeHandler: this.managedAddEdgeHandler,
                managedRemoveNodeHandler: this.managedRemoveNodeHandler,
                managedRemoveEdgeHandler: this.managedRemoveEdgeHandler,
                managedAlgorithm: this.managedAlgorithm,
                managedAlgorithmCanceled: this.managedAlgorithmCanceled,
                initiateGraph: this.initiateGraph,
                randomGraph: this.randomGraph,
                addNode: this.addNode,
                addNodeValue: this.addNodeValue,
                removeNode: this.removeNode,
                addEdge: this.addEdge,
                removeEdge: this.removeEdge
            };
            return <WrappedComponent {...proxy} {...this.props} />
        }
    }
}

export default withGraph;