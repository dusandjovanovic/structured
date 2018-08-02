import React, {Component} from 'react';
import Graph from '../../components/visualization/graph/graph';
import randomData from '../../utils/graph-module/graph.random';
import classes from './room.css';

import {graphFactory} from '../../utils/graph-module/graph.module';

class Room extends Component {
    graphWidth = 960;
    graphHeight = 600;

    state = {
        nodes: [],
        links: []
    };

    componentDidMount() {
        this.updateData();
        let x = graphFactory();
        x.addVertex(11);
        x.addVertex(13);
        x.addEdge(11, 13);
        console.log(x.getGraph());
    };

    updateData = () => {
        let randomGraph = randomData(this.state.nodes, this.graphWidth, this.graphHeight);
        this.setState(randomGraph);
    };

    addData = () => {
        let newState = {
            ...this.state
        };

        newState.nodes.push({
            key: 99,
            size: 20
        });

        this.setState(newState);
    };

    render() {
        return (
            <div>
                <div className={classes.update} onClick={this.updateData}>New random graph</div>
                <div className={classes.update} onClick={this.addData}>Add node</div>
                <Graph width={960} height={600} nodes={this.state.nodes} links={this.state.links} />
            </div>
        );
    };
}
export default Room;