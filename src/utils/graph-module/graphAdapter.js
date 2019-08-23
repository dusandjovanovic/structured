export const graphAdapterNode = (node, graph) => {
	graph.nodes.push({
		key: node,
		inEdges: [],
		outEdges: []
	});
};

export const graphAdapterEdge = (source, target, graph) => {
	let srcNode = graph.nodes.findIndex(element => element.key === source);
	let dstNode = graph.nodes.findIndex(element => element.key === target);
	if (graph.nodes[dstNode]) {
		graph.edges.push({
			key: source + "->" + target,
			source: graph.nodes[srcNode],
			target: graph.nodes[dstNode]
		});
		graph.nodes.map(node => {
			if (node.key === source) {
				node.outEdges.push(target);
				node.outEdges.sort((a, b) => a - b);
			} else if (node.key === target) {
				node.inEdges.push(source);
				node.inEdges.sort((a, b) => a - b);
			}
			return true;
		});
	}
};

export const graphAdapterNodeRemove = (node, graph) => {
	graph.edges.map(edge => {
		if (edge.target.key === node || edge.source.key === node)
			graphAdapterEdgeRemove(edge.source.key, edge.target.key, graph);
		return edge;
	});
	graph.nodes = graph.nodes.filter(element => element.key !== node);
};

export const graphAdapterEdgeRemove = (source, target, graph) => {
	graph.edges = graph.edges.filter(
		element =>
			element.source.key !== source || element.target.key !== target
	);
	graph.nodes.map(node => {
		if (node.key === target)
			node.inEdges = node.inEdges.filter(element => element !== source);
		else if (node.key === source)
			node.outEdges = node.outEdges.filter(element => element !== target);
		return node;
	});
};
