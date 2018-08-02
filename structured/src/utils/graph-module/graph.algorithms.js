import {stack} from './stack.module';
import {queue} from './queue.module';

let graph;
let keys;

const displayVertex = (node) => console.log(node);

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

export function dfs () {
    graph = this.getGraph();
    keys = Object.keys(graph);
    let graphStack = stack();
    graph[keys[0]].visited = true;
    displayVertex(keys[0]);
    graphStack.push(keys[0]);

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
}

export function bfs () {
    graph = this.getGraph();
    keys = Object.keys(graph);
    let unvistedVertex;
    let graphQueue = queue();
    graph[keys[0]].visited = true;
    displayVertex(keys[0]);
    graphQueue.enqueue(keys[0]);

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
}