import React, {Component} from 'react';
import * as d3 from 'd3';
import classes from './graph.css';

var width = 960;
var height = 500;
var force = d3.layout.force()
    .charge(-400)
    .linkDistance(250)
    .size([width, height]);

class Graph extends Component {
    componentWillMount() {
        force.on('tick', () => {
            // after force calculation starts, call
            // forceUpdate on the React component on each tick
            this.forceUpdate()
        });
    };

    componentWillReceiveProps(nextProps) {
        // we should actually clone the nodes and links
        // since we're not supposed to directly mutate
        // props passed in from parent, and d3's force function
        // mutates the nodes and links array directly
        // we're bypassing that here for sake of brevity in example
        force.nodes(nextProps.nodes).links(nextProps.links);

        force.start();
    };

    nodeClicked = (node) => {
        console.log(node);
    };

    render() {
        // use React to draw all the nodes, d3 calculates the x and y
        var nodes = this.props.nodes.map((node) => {
            var transform = 'translate(' + node.x + ',' + node.y + ')';
            return (
                <g className={classes.node} key={node.key} transform={transform}>
                    <circle onClick={() => this.nodeClicked(node)} r={node.size} />
                    <text x={node.size + 5} dy='.35em'>{node.key}</text>
                </g>
            );
        });
        var links = this.props.links.map((link) => {
            return (
                <line className={classes.link} key={link.key} strokeWidth={link.size}
                      x1={link.source.x} x2={link.target.x} y1={link.source.y} y2={link.target.y} />
            );
        });

        return (
            <svg width={width} height={height}>
                <g>
                    {links}
                    {nodes}
                </g>
            </svg>
        );
    }
}

export default Graph;