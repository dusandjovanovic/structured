import {bfs, dfs} from './graph.algorithms';

export const graphFactory = () => {
    let graph = {};
    let vertices = 0;
    let nodes = [];
    let edges = [];

    const graphProto = {
        contains: (node) => !!graph[node],
        hasEdge: (nodeOne, nodeTwo) => {
            if (graphProto.contains(nodeOne) && graphProto.contains(nodeTwo)) {
                return !!graph[nodeOne].edges[nodeTwo]
            }
        },
        addVertex: (node) => {
            if (!graphProto.contains(node)) {
                graph[node] = {edges: {}, visited: false};
                nodes.push({
                    key: node
                });
                vertices += 1;
            }
        },
        removeVertex: (node) => {
            if (graphProto.contains(node)) {
                for (let item in graph[node].edges) {
                    if (graph[node].edges.hasOwnProperty(item)) {
                        graph.removeEdge(node, item);
                    }
                }
                vertices -= 1;
                delete graph[node];
                nodes = nodes.filter((element) =>
                    (element.key === node));
            }
        },
        addEdge: (nodeOne, nodeTwo) => {
            if (graphProto.contains(nodeOne) && graphProto.contains(nodeTwo)) {
                graph[nodeOne].edges[nodeTwo] = true;
                edges.push({
                    key: nodeOne + '->' + nodeTwo,
                    source: nodeOne,
                    target: nodeTwo
                });
            }
        },
        removeEdge: (nodeOne, nodeTwo) => {
            if (graphProto.contains(nodeOne) && graphProto.contains(nodeTwo)) {
                delete graph[nodeOne].edges[nodeTwo];
                edges = edges.filter((element) =>
                    (element.source.key === nodeOne && element.target.key === nodeTwo));
            }
        },
        getGraph: () => graph,
        getVertex: (node) => (graphProto.contains(node)) ? graph.nodes[node] : false,
        getNumVertices: () => vertices,
        nodes: nodes,
        edges: edges
    };

    Object.assign(graphProto, {bfs: bfs.bind(graphProto), dfs: dfs.bind(graphProto)});
    return Object.create(graphProto)
};