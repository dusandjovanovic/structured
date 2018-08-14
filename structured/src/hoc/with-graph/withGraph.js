import React from 'react';
import {graphFactory} from "../../utils/graph-module/graph.module";
import randomData from "../../utils/graph-module/graph.random";

function withGraph(WrappedComponent) {
    return class extends React.Component {
        graph = new graphFactory();

        state = {
            graph: null,
            graphManaged: false,
            graphManagedAddEdge: false,
            graphManagedRemoveNode: false,
            graphManagedRemoveEdge: false
        };

        managedAddEdgeHandler = () => {
            this.setState({
                graphManaged: true,
                graphManagedAddEdge: true,
                graphManagedRemoveNode: false,
                graphManagedRemoveEdge: false
            });
        };

        managedRemoveNodeHandler = () => {
            this.setState({
                graphManaged: true,
                graphManagedAddEdge: false,
                graphManagedRemoveNode: true,
                graphManagedRemoveEdge: false
            });
        };

        managedRemoveEdgeHandler = () => {
            this.setState({
                graphManaged: true,
                graphManagedAddEdge: false,
                graphManagedRemoveNode: false,
                graphManagedRemoveEdge: true
            });
        };

        managedAlgorithm = () => {
            this.setState({
                graphManaged: true,
                graphManagedAddEdge: false,
                graphManagedRemoveNode: false,
                graphManagedRemoveEdge: false
            });
        };

        managedAlgorithmCanceled = () => {
            this.setState({
                graphManaged: false,
                graphManagedAddEdge: false,
                graphManagedRemoveNode: false,
                graphManagedRemoveEdge: false
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
                this.setState({
                    graph: this.graph.getGraph(),
                    graphManaged: false,
                    graphManagedAddEdge: false,
                    graphManagedRemoveNode: false,
                    graphManagedRemoveEdge: false
                });
            }
        };

        randomGraph = () => {
            let randomGraph = randomData();
            this.initiateGraph(randomGraph);
        };

        addNode = () => {
            let node = this.graph.addVertexRandom();
            this.setState({
                graph: this.graph.getGraph(),
                graphManaged: false,
                graphManagedAddEdge: false,
                graphManagedRemoveNode: false,
                graphManagedRemoveEdge: false
            });
            this.props.addNodeIO(node);
        };

        addNodeValue = (node) => {
            this.graph.addVertex(node);
            this.setState({
                graph: this.graph.getGraph(),
                graphManaged: false,
                graphManagedAddEdge: false,
                graphManagedRemoveNode: false,
                graphManagedRemoveEdge: false
            });
        };

        removeNode = (node) => {
            this.graph.removeVertex(node);
            this.setState({
                graph: this.graph.getGraph(),
                graphManaged: false,
                graphManagedAddEdge: false,
                graphManagedRemoveNode: false,
                graphManagedRemoveEdge: false
            });
        };

        addEdge = (source, target) => {
            this.graph.addEdge(source, target);
            this.setState({
                graph: this.graph.getGraph(),
                graphManaged: false,
                graphManagedAddEdge: false,
                graphManagedRemoveNode: false,
                graphManagedRemoveEdge: false
            });
        };

        removeEdge = (source, target) => {
            this.graph.removeEdge(source, target);
            this.setState({
                graph: this.graph.getGraph(),
                graphManaged: false,
                graphManagedAddEdge: false,
                graphManagedRemoveNode: false,
                graphManagedRemoveEdge: false
            });
        };

        render() {
            const proxy = {
                graph: this.graph,
                visualization: this.graph.visualization,
                graphManaged: this.state.graphManaged,
                graphManagedAddEdge: this.state.graphManagedAddEdge,
                graphManagedRemoveNode: this.state.graphManagedRemoveNode,
                graphManagedRemoveEdge: this.state.graphManagedRemoveEdge,
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