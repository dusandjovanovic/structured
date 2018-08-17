import {stack} from './stack.module';
import {queue} from './queue.module';

let graph;
let solution = [];

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

export function dfs (root) {
    graph = this.getGraph();
    solution = [];
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

export function bfs (root) {
    graph = this.getGraph();
    solution = [];
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