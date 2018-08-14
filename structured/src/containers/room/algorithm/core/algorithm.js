import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './algorithm.css';
import ControlBar from "./control-bar/controlBar";

class algorithm extends Component {
    render() {
        return (
            <Draggable defaultClassName="react-draggable" bounds="parent">
                <div>
                    <div className="p-4 mb-5 ml-4 mr-4">
                        DFS(G,v)   ( v is the vertex where the search starts ) <br/>
                        Stack S := {};   ( start with an empty stack ) <br/>
                        for each vertex u, set visited[u] := false; <br/>
                        push S, v; <br/>
                        while (S is not empty) do <br/>
                        u := pop S; <br/>
                        if (not visited[u]) then <br/>
                        visited[u] := true; <br/>
                        for each unvisited neighbour w of u <br/>
                        push S, w; <br/>
                        end if <br/>
                        end while <br/>
                        END DFS() <br/>
                    </div>
                    <ControlBar play={null}
                                playing={null}
                                goToPrevStep={null}
                                goToNextStep={null}
                    />
                </div>
            </Draggable>
        );
    };
}

export default algorithm;