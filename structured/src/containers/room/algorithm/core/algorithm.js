import React, { Component } from 'react';
import Draggable from 'react-draggable';
import ControlBar from "./control-bar/controlBar";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { arduinoLight } from 'react-syntax-highlighter/styles/hljs';
import './algorithm.css';

class algorithm extends Component {
    algorithmInit = () => {
        if (!this.props.algorithmActive) {
            this.props.algorithmVisualize();
        }
        else {
            this.props.algorithmPause();
        }
    };

    render() {
        return (
            <Draggable defaultClassName="react-draggable" bounds="parent">
                <div>
                    <div className="p-4 mb-5 ml-4 mr-4">
                        <SyntaxHighlighter language="javascript" style={arduinoLight}>
                            {
                                this.props.algorithmType === 'ALGORITHM_BREADTH'
                                ?
`procedure BFS(G, v):
    create a queue Q
    enqueue v onto Q
    mark v
    while Q is not empty:
         t ← Q.dequeue()
         if t is what we are looking for:
              return t
         for all edges e in G.adjacentEdges(t) do
              o ← G.adjacentVertex(t, e)
              if o is not marked:
                   mark o
                   enqueue o onto Q
    return null`
                                :
`procedure DFS(G, v):
     label v as explored
     for all edges e in G.incidentEdges(v) do
          if edge e is unexplored then
               w ← G.adjacentVertex(v, e)
               if vertex w is unexplored then
                    label e as a discovered edge
                    recursively call DFS(G, w)
               else
                    label e as a back edge`
                            }
                        </SyntaxHighlighter>
                    </div>
                    <ControlBar play={this.algorithmInit}
                                playing={this.props.algorithmActive}
                                goToPrevStep={this.props.algorithmPreviousState}
                                goToNextStep={this.props.algorithmNextState}
                    />
                </div>
            </Draggable>
        );
    };
}

export default algorithm;