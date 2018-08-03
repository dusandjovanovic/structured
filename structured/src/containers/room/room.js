import React, {Component} from 'react';
import Graph from '../../components/visualization/graph/graph';
import Actionbar from '../../components/user-interface/actionbar/actionbar';
import randomData from '../../utils/graph-module/graph.random';
import {graphFactory} from '../../utils/graph-module/graph.module';
import Button from "../../components/user-interface/button/button";
import classes from './room.css';

class Room extends Component {
    graphWidth = 800;
    graphHeight = 600;
    graph = new graphFactory();
    state = {
        nodes: [],
        edges: []
    };

    componentDidMount() {
        this.updateData();
    }

    updateData = () => {
        let randomGraph = randomData(this.graph.nodes, this.graphWidth, this.graphHeight);
        this.graph = new graphFactory();
        randomGraph.nodes.map(node => {
            this.graph.addVertex(node.key);
        });
        randomGraph.edges.map(edge => {
            this.graph.addEdge(edge.source, edge.target);
        });
        this.setState({
            nodes: this.graph.nodes,
            edges: this.graph.edges
        });
    };

    addData = () => {
        this.graph.addVertex(99);
        this.setState({
            nodes: this.graph.nodes
        });
    };

    render() {
        return (
            <div>
                <Actionbar>
                    <Button btnType="Flat" clicked={() => this.updateData()}>Random graph ↺</Button>
                    <Button btnType="Flat" clicked={() => this.addData()}>Add node</Button>
                </Actionbar>
                <Graph width={this.graphWidth} height={this.graphHeight} nodes={this.state.nodes} edges={this.state.edges} />
            </div>
        );
    };
}
export default Room;