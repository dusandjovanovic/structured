import React from 'react';
import { Button } from "reactstrap";
import Modal from "../../../../components/user-interface/modal/modal";

const compete = (props) => (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h3> </h3>
        <div className="btn-toolbar mb-2 mb-md-0">
            <h4 className="m-auto" style={{position: 'absolute', left: '0%', paddingLeft: '1.5rem'}}>
                {props.competeType === 'COMPETE_BREADTH'
                    ? 'Breadth-first search'
                    : 'Depth-first search'
                }
            </h4>

            <Button outline color="secondary"
                    disabled={!props.graphManaged}
                    onClick={() => props.competeEnded()}>
                <i className="fas fa-check"> </i> Submit solution
            </Button>

            <Modal title="Some hints about traversals" buttonCondition buttonLabel="Help!" buttonClass="btn-outline">
                <div>
                    <strong>Depth-first search</strong>
                    <br />
                    A depth-first search (DFS) is an algorithm for <em>traversing a finite graph</em>. DFS visits the child vertices before visiting the sibling vertices; that is, it traverses the <em>depth of any particular path before exploring its breadth</em>. A stack (often the program's call stack via recursion) is generally used when implementing the algorithm.
                    <mark>The algorithm begins with a chosen root vertex; it then iteratively transitions from the current vertex to an adjacent, unvisited vertex, until it can no longer find an unexplored vertex to transition to from its current location.</mark> The algorithm then backtracks along previously visited vertices, until it finds a vertex connected to yet more uncharted territory. It will then proceed down the new path as it had before, backtracking as it encounters dead-ends, and ending only when the algorithm has backtracked past the original "root" vertex from the very first step.
                    DFS is the basis for many graph-related algorithms, including topological sorts and planarity testing.
                    <br />
                    <code>
                        1 procedure DFS(G, v):<br />
                        2     label v as explored<br />
                        3     for all edges e in G.incidentEdges(v) do<br />
                        4         if edge e is unexplored then<br />
                        5             w ← G.adjacentVertex(v, e)<br />
                        6             if vertex w is unexplored then<br />
                        7                 label e as a discovered edge<br />
                        8                 recursively call DFS(G, w)<br />
                        9             else<br />
                        10               label e as a back edge<br />
                    </code>
                    <hr />
                    <strong>Breadth-first search</strong>
                    <br />
                    A breadth-first search (BFS) is another technique for traversing a finite graph. BFS visits the neighbor vertices before visiting the child vertices, and a queue is used in the search process. This algorithm is often used to find the shortest path from one vertex to another.
                    <br />
                    <code>
                        1 procedure BFS(G, v):<br />
                        2     create a queue Q<br />
                        3     enqueue v onto Q<br />
                        4     mark v<br />
                        5     while Q is not empty:<br />
                        6         t ← Q.dequeue()<br />
                        7         if t is what we are looking for:<br />
                        8             return t<br />
                        9         for all edges e in G.adjacentEdges(t) do<br />
                        12            o ← G.adjacentVertex(t, e)<br />
                        13            if o is not marked:<br />
                        14                mark o<br />
                        15                enqueue o onto Q<br />
                        16     return null<br />
                    </code>
                    <br />
                    <footer className="blockquote-footer">as said on <cite title="Source Title">Wikipedia</cite></footer>
                </div>
            </Modal>
        </div>
    </div>
);


export default compete;