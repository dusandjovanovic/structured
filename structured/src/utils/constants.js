export const ROOM_TYPE_LEARN = "learn";
export const ROOM_TYPE_PRACTICE = "practice";
export const ROOM_TYPE_COMPETE = "compete";

export const ALGORITHM_BREADTH = "ALGORITHM_BREADTH";
export const ALGORITHM_DEPTH = "ALGORITHM_DEPTH";
export const ALGORITHM_BREADTH_OBSERVABLE = "ALGORITHM_BREADTH_OBSERVABLE";
export const ALGORITHM_DEPTH_OBSERVABLE = "ALGORITHM_DEPTH_OBSERVABLE";

export const GRAPH_LEARN_GRAPHS = "GRAPH_LEARN_GRAPHS";
export const GRAPH_LEARN_REPRESENTATIONS = "GRAPH_LEARN_REPRESENTATIONS";
export const GRAPH_LEARN_TRAVERSALS = "GRAPH_LEARN_TRAVERSALS";

export const COMPETE_BREADTH = "ALGORITHM_BREADTH";
export const COMPETE_DEPTH = "ALGORITHM_DEPTH";

export const GRAPH_MANAGED_REMOVE_NODE = "GRAPH_MANAGED_REMOVE_NODE";
export const GRAPH_MANAGED_ADD_EDGE = "GRAPH_MANAGED_ADD_EDGE";
export const GRAPH_MANAGED_REMOVE_EDGE = "GRAPH_MANAGED_REMOVE_EDGE";
export const GRAPH_MANAGED_ALGORITHM = "GRAPH_MANAGED_ALGORITHM";
export const GRAPH_MANAGED_COMPETE = "GRAPH_MANAGED_COMPETE";

export const CODE_BREADTH = `1. procedure BFS(G, v):
2.    create a queue Q
3.    enqueue v onto Q
4.    mark v
5.    while Q is not empty:
6.         t ← Q.dequeue()
7.         if t is what we are looking for:
8.              return t
9.         for all edges e in G.adjacentEdges(t) do
10.              o ← G.adjacentVertex(t, e)
11.              if o is not marked:
12.                   mark o
13.                   enqueue o onto Q
14.    return null`;

export const CODE_DEPTH = `1. procedure DFS(G, v):
2.     create a stack S
3.     push v onto S
4.     label v as explored
5.     while S is not empty:
6.         t ← S.pop()
7.         if t is what we are looking for:
8.              return t
9.         for all edges e in G.adjacentEdges(t) do
10.              o ← G.adjacentVertex(t, e)
11.              if o is not marked:
12.                   mark o
13.                   push o onto S
14.    return null`;
