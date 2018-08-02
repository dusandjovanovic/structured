import React, {Component} from 'react';
import GraphD3 from '../../components/visualization/graph/graph';
import * as _ from 'underscore';
import classes from './graph.css';

var width = 960;
var height = 500;

class Graph extends Component {
    state = {
        nodes: [],
        links: []
    };

    componentDidMount() {
        this.updateData();
    };

    updateData = () => {
        var newState = randomData(this.state.nodes, width, height);
        this.setState(newState);
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
                <GraphD3 nodes={this.state.nodes} links={this.state.links} />
            </div>
        );
    };
}

function randomData(previous, width, height) {
    var oldNodes = previous;
    // generate some data randomly
    let nodes = _.chain(_.range(_.random(10, 30)))
        .map(function() {
            var node = {};
            node.key = _.random(0, 30);
            node.size = 20;

            return node;
        }).uniq(function(node) {
            return node.key;
        }).value();

    if (oldNodes) {
        var add = _.initial(oldNodes, _.random(0, oldNodes.length));
        add = _.rest(add, _.random(0, add.length));

        nodes = _.chain(nodes)
            .union(add).uniq(function(node) {
                return node.key;
            }).value();
    }

    let links = _.chain(_.range(_.random(15, 35)))
        .map(function() {
            var link = {};
            link.source = _.random(0, nodes.length - 1);
            link.target = _.random(0, nodes.length - 1);
            link.key = link.source + ',' + link.target;
            link.size = _.random(1, 3);

            return link;
        }).uniq((link) => link.key)
        .value();

    maintainNodePositions(oldNodes, nodes, width, height);

    return {nodes, links};
}

function maintainNodePositions(oldNodes, nodes, width, height) {
    var kv = {};
    _.each(oldNodes, function(d) {
        kv[d.key] = d;
    });
    _.each(nodes, function(d) {
        if (kv[d.key]) {
            // if the node already exists, maintain current position
            d.x = kv[d.key].x;
            d.y = kv[d.key].y;
        } else {
            // else assign it a random position near the center
            d.x = width / 2 + _.random(-150, 150);
            d.y = height / 2 + _.random(-25, 25);
        }
    });
}

export default Graph;