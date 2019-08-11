import React, { Component } from "react";
import Draggable from "react-draggable";
import ControlBar from "./control-bar/controlBar";
import SyntaxHighlighter from "react-syntax-highlighter";
import { arduinoLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./algorithm.css";

const codeBreadth = `1. procedure BFS(G, v):
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

const codeDepth = `1. procedure DFS(G, v):
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

class algorithm extends Component {
    state = {
        algorithmLine: 1
    };

    componentDidUpdate(prevProps) {
        if (
            this.props.algorithmState &&
            this.props.algorithmState.algorithmLine !== this.state.algorithmLine
        )
            this.setState({
                algorithmLine: this.props.algorithmState.algorithmLine
            });
        else
            this.setState({
                algorithmLine: 1
            });
    }

    algorithmInit = () => {
        if (!this.props.algorithmActive) {
            this.props.algorithmVisualize();
        } else {
            this.props.algorithmPause();
        }
    };

    render() {
        return (
            <Draggable defaultClassName="react-draggable" bounds="parent">
                <div style={{ display: "flex" }}>
                    <div
                        className="p-4 mb-5 ml-4 mr-4"
                        style={{
                            flex: 1,
                            width: "100%",
                            flexDirection: "column"
                        }}
                    >
                        <SyntaxHighlighter
                            language="python"
                            style={arduinoLight}
                            wrapLines={true}
                            lineProps={lineNumber => ({
                                style: {
                                    display: "block",
                                    color:
                                        this.state.algorithmLine === lineNumber
                                            ? "#cbf7ff"
                                            : null,
                                    backgroundColor:
                                        this.state.algorithmLine === lineNumber
                                            ? "#4a515b"
                                            : "#ffffff"
                                }
                            })}
                        >
                            {this.props.algorithmType ===
                            "ALGORITHM_DEPTH_OBSERVABLE"
                                ? codeDepth
                                : codeBreadth}
                        </SyntaxHighlighter>
                    </div>
                    <ControlBar
                        play={this.algorithmInit}
                        playing={this.props.algorithmActive}
                        goToPrevStep={this.props.algorithmPreviousState}
                        goToNextStep={this.props.algorithmNextState}
                    />
                </div>
            </Draggable>
        );
    }
}

export default algorithm;
