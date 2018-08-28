import {stack} from './stack.module';
import {queue} from './queue.module';

let graph;
let solution = [];
let visited = [];
let stream = [];

const displayVertex = (node) => solution.push(node);

const getUnvistedVertex = (vertex) => {
    for (let node in graph[vertex].edges) {
        if (graph[node].visited === false) {
            return node;
        }
    }
    return false
};

const resetSearch = () => {
    for (let node in graph) {
        graph[node].visited = false;
    }
};

const observableState = (visited, solution, tempVertex, unvisitedVertex) => ({
    visited: [...visited],
    solution: [...solution],
    tempVertex: tempVertex,
    unvisitedVertex: unvisitedVertex
});

export function observable (root, ALGORITHM_TYPE) {
    graph = this.getGraph();
    switch (ALGORITHM_TYPE) {
        case 'ALGORITHM_BREADTH':
            return bfsObservable(root, graph);
        case 'ALGORITHM_DEPTH':
            return dfsObservable(root, graph);
        default:
            return;
    }
}

export function bfs (root) {
    graph = this.getGraph();
    solution = [];
    visited = [];
    let unvistedVertex;
    let graphQueue = queue();
    graph[root].visited = true;
    displayVertex(root);
    graphQueue.enqueue(root);

    while (!graphQueue.isEmpty()) {
        let tempVertex = graphQueue.dequeue();
        unvistedVertex = getUnvistedVertex(tempVertex);

        while (unvistedVertex !== false) {
            graph[unvistedVertex].visited = true;
            displayVertex(unvistedVertex);
            graphQueue.enqueue(unvistedVertex);
            unvistedVertex = getUnvistedVertex(tempVertex);
        }
    }

    resetSearch();
    return solution;
}

function bfsObservable (root, graph) {
    solution = [];
    visited = [];
    stream = [];
    let unvistedVertex;
    let graphQueue = queue();
    stream.push(observableState(visited, solution, root, null));
    graph[root].visited = true;
    visited.push(root);
    stream.push(observableState(visited, solution, root, null));
    displayVertex(root);
    graphQueue.enqueue(root);

    while (!graphQueue.isEmpty()) {
        let tempVertex = graphQueue.dequeue();
        unvistedVertex = getUnvistedVertex(tempVertex);
        stream.push(observableState(visited, solution, tempVertex, unvistedVertex));

        while (unvistedVertex !== false) {
            stream.push(observableState(visited, solution, tempVertex, unvistedVertex));
            graph[unvistedVertex].visited = true;
            visited.push(unvistedVertex);
            displayVertex(unvistedVertex);
            stream.push(observableState(visited, solution, tempVertex, unvistedVertex));
            graphQueue.enqueue(unvistedVertex);
            unvistedVertex = getUnvistedVertex(tempVertex);
            stream.push(observableState(visited, solution, tempVertex, unvistedVertex));
        }
    }

    resetSearch();
    return stream;
}

export function dfs (root) {
    graph = this.getGraph();
    solution = [];
    visited = [];
    let graphStack = stack();
    graph[root].visited = true;
    displayVertex(root);
    graphStack.push(root);

    while (!graphStack.isEmpty()) {
        let unvistedVertex = getUnvistedVertex(graphStack.peek());

        if (unvistedVertex === false) {
            graphStack.pop()
        } else {
            graph[unvistedVertex].visited = true;
            displayVertex(unvistedVertex);
            graphStack.push(unvistedVertex);
        }
    }

    resetSearch();
    return solution;
}

export function dfsObservable (root, graph) {
    solution = [];
    visited = [];
    stream = [];
    let graphStack = stack();
    graph[root].visited = true;
    stream.push(observableState(visited, solution, root, null));
    visited.push(root);
    displayVertex(root);
    graphStack.push(root);
    stream.push(observableState(visited, solution, root, null));

    while (!graphStack.isEmpty()) {
        let unvistedVertex = getUnvistedVertex(graphStack.peek());
        stream.push(observableState(visited, solution, unvistedVertex, null));

        if (unvistedVertex === false) {
            graphStack.pop()
        } else {
            graph[unvistedVertex].visited = true;
            visited.push(unvistedVertex);
            stream.push(observableState(visited, solution, unvistedVertex, null));
            displayVertex(unvistedVertex);
            stream.push(observableState(visited, solution, unvistedVertex, null));
            graphStack.push(unvistedVertex);
        }
    }

    return stream;
}