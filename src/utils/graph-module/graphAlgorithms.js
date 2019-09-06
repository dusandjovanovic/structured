import { stack } from "./stackModule";
import { queue } from "./queueModule";
import {
	ALGORITHM_BREADTH,
	ALGORITHM_DEPTH,
	ALGORITHM_BREADTH_OBSERVABLE,
	ALGORITHM_DEPTH_OBSERVABLE
} from "../constants";

import forEach from "lodash/forEach";

let graph;
let solution = [];
let visited = [];
let stream = [];

const displayVertex = node => solution.push(node);

const getUnvistedVertex = vertex => {
	forEach(graph[vertex].edges, function(node, key) {
		if (graph[key].visited === false) {
			return key;
		}
	});
	return false;
};

const resetSearch = () => {
	forEach(graph, function(node) {
		node.visited = false;
	});
};

const observableState = (
	visited,
	solution,
	tempVertex,
	unvisitedVertex,
	algorithmFlow,
	structure
) => ({
	visited: [...visited],
	solution: [...solution],
	tempVertex: tempVertex,
	unvisitedVertex: unvisitedVertex,
	algorithmFlow: algorithmFlow,
	structure: structure
});

const observableDefragment = observableState =>
	observableState.algorithmFlow.map(element => ({
		visited: [...observableState.visited],
		solution: [...observableState.solution],
		tempVertex: observableState.tempVertex,
		unvisitedVertex: observableState.unvisitedVertex,
		structure: [...observableState.structure],
		algorithmLine: element
	}));

export function algorithm(root, ALGORITHM_TYPE) {
	graph = this.getGraph();
	switch (ALGORITHM_TYPE) {
		case ALGORITHM_BREADTH:
			return breadthFirstSearch(root, graph);
		case ALGORITHM_DEPTH:
			return depthFirstSearch(root, graph);
		case ALGORITHM_BREADTH_OBSERVABLE:
			return breadthFirstSearch(root, graph, true);
		case ALGORITHM_DEPTH_OBSERVABLE:
			return depthFirstSearch(root, graph, true);
		default:
			return;
	}
}

const breadthFirstSearch = (root, graph, observable = false) => {
	solution = [];
	visited = [];
	stream = [];
	let unvistedVertex;
	let graphQueue = queue();
	stream.push(
		observableState(
			visited,
			solution,
			null,
			null,
			[2],
			graphQueue.getQueue()
		)
	);
	graph[root].visited = true;
	visited.push(root);
	displayVertex(root);
	graphQueue.enqueue(root);
	stream.push(
		observableState(
			visited,
			solution,
			root,
			null,
			[3, 4, 5],
			graphQueue.getQueue()
		)
	);

	while (!graphQueue.isEmpty()) {
		let tempVertex = graphQueue.dequeue();
		stream.push(
			observableState(
				visited,
				solution,
				tempVertex,
				unvistedVertex,
				[6, 7],
				graphQueue.getQueue()
			)
		);
		unvistedVertex = getUnvistedVertex(tempVertex);

		while (unvistedVertex !== false) {
			stream.push(
				observableState(
					visited,
					solution,
					tempVertex,
					unvistedVertex,
					[9, 10, 11],
					graphQueue.getQueue()
				)
			);
			graph[unvistedVertex].visited = true;
			visited.push(unvistedVertex);
			displayVertex(unvistedVertex);
			stream.push(
				observableState(
					visited,
					solution,
					tempVertex,
					unvistedVertex,
					[12],
					graphQueue.getQueue()
				)
			);
			graphQueue.enqueue(unvistedVertex);
			stream.push(
				observableState(
					visited,
					solution,
					tempVertex,
					unvistedVertex,
					[13],
					graphQueue.getQueue()
				)
			);
			unvistedVertex = getUnvistedVertex(tempVertex);
		}
	}

	stream.push(
		observableState(
			visited,
			solution,
			null,
			null,
			[8],
			graphQueue.getQueue()
		)
	);

	resetSearch();
	let algorithm = [];
	stream.map(observableState => {
		return observableDefragment(observableState).map(element =>
			algorithm.push(element)
		);
	});

	if (observable) return algorithm;
	else return solution;
};

const depthFirstSearch = (root, graph, observable = false) => {
	solution = [];
	visited = [];
	stream = [];
	let graphStack = stack();
	stream.push(
		observableState(
			visited,
			solution,
			null,
			null,
			[2],
			graphStack.getStack()
		)
	);
	graph[root].visited = true;
	visited.push(root);
	displayVertex(root);
	graphStack.push(root);
	stream.push(
		observableState(
			visited,
			solution,
			root,
			null,
			[3, 4, 5],
			graphStack.getStack()
		)
	);

	while (!graphStack.isEmpty()) {
		let unvistedVertex = getUnvistedVertex(graphStack.peek());
		stream.push(
			observableState(
				visited,
				solution,
				unvistedVertex,
				null,
				[6, 7],
				graphStack.getStack()
			)
		);

		if (unvistedVertex === false) {
			graphStack.pop();
		} else {
			stream.push(
				observableState(
					visited,
					solution,
					unvistedVertex,
					null,
					[9, 10, 11],
					graphStack.getStack()
				)
			);
			graph[unvistedVertex].visited = true;
			visited.push(unvistedVertex);
			displayVertex(unvistedVertex);
			stream.push(
				observableState(
					visited,
					solution,
					unvistedVertex,
					null,
					[12],
					graphStack.getStack()
				)
			);
			graphStack.push(unvistedVertex);
			stream.push(
				observableState(
					visited,
					solution,
					unvistedVertex,
					null,
					[13],
					graphStack.getStack()
				)
			);
		}
	}

	stream.push(
		observableState(
			visited,
			solution,
			null,
			null,
			[8],
			graphStack.getStack()
		)
	);

	let algorithm = [];
	stream.map(observableState => {
		return observableDefragment(observableState).map(element =>
			algorithm.push(element)
		);
	});

	if (observable) return algorithm;
	else return solution;
};
