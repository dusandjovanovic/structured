import {bfs, dfs, observable} from './graph.algorithms';
import * as adapter from './graph.adapter';
import _ from 'underscore';

export const graphFactory = () => {
    let graph = {};
    let vertices = 0;
    let visualization = {
        nodes: [],
        edges: []
    };

    const graphProto = {
        contains: (node) => !!graph[node],
        hasEdge: (nodeOne, nodeTwo) => {
            if (graphProto.contains(nodeOne) && graphProto.contains(nodeTwo)) {
                return !!graph[nodeOne].edges[nodeTwo]
            }
        },
        addVertex: (node) => {
            if (!graphProto.contains(node)) {
                graph[node] = {edges: {}, input: {}, visited: false};
                adapter.graphAdapterNode(node.toString(), visualization);
                vertices += 1;
            }
        },
        addVertexRandom: () => {
            let random = _.random(0, 99);
            while (graphProto.contains(random))
                random = _.random(0, 99);
            graphProto.addVertex(random);
            return random;
        },
        removeVertex: (node) => {
            if (graphProto.contains(node)) {
                for (let item in graph[node].edges) {
                    if (graph[node].edges.hasOwnProperty(item)) {
                        graphProto.removeEdge(node, item);
                    }
                }
                adapter.graphAdapterNodeRemove(node.toString(), visualization);
                vertices -= 1;
                delete graph[node];
            }
        },
        addEdge: (nodeOne, nodeTwo) => {
            if (graphProto.contains(nodeOne) && graphProto.contains(nodeTwo)) {
                if (!graph[nodeOne].edges[nodeTwo] && !graph[nodeTwo].input[nodeOne]) {
                    graph[nodeOne].edges[nodeTwo] = true;
                    graph[nodeTwo].input[nodeOne] = true;
                    adapter.graphAdapterEdge(nodeOne.toString(), nodeTwo.toString(), visualization);
                }
            }
        },
        removeEdge: (nodeOne, nodeTwo) => {
            if (graphProto.contains(nodeOne) && graphProto.contains(nodeTwo)) {
                delete graph[nodeOne].edges[nodeTwo];
                delete graph[nodeTwo].input[nodeOne];
                adapter.graphAdapterEdgeRemove(nodeOne.toString(), nodeTwo.toString(), visualization);
            }
        },
        getGraph: () => graph,
        getVertex: (node) => (graphProto.contains(node)) ? graph.nodes[node] : false,
        getNumVertices: () => vertices,
        visualization: visualization
    };

    Object.assign(graphProto, {bfs: bfs.bind(graphProto), dfs: dfs.bind(graphProto), observable: observable.bind(graphProto)});
    return Object.create(graphProto)
};