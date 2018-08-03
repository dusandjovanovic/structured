import React, {Component} from 'react';
import * as d3 from 'd3';
import classes from './graph.css';

class Graph extends Component {
    simulation = null;
    componentWillMount() {
        this.simulation = d3.forceSimulation()
            .force("charge", d3.forceManyBody().strength(-500))
            .force("link", d3.forceLink().distance(250))
            .force("x", d3.forceX(this.props.width / 2))
            .force("y", d3.forceY(this.props.height / 2))
            .force('center', d3.forceCenter(this.props.width / 2, this.props.height / 2));
        this.simulation.on('tick', () => {
            // after force calculation starts, call
            // forceUpdate on the React component on each tick
            this.forceUpdate();
        });
    };

    componentWillReceiveProps(nextProps) {
        // d3's force function has side-effects and
        // mutates the nodes and links array directly
        // this.props.nodes/links will contain x and y values
        this.simulation.nodes(nextProps.nodes);
        this.simulation.force("link").links(nextProps.links);
        this.simulation.alpha(1);
        this.simulation.restart();
    };

    componentWillUnmount() {
        this.simulation.stop();
    }

    nodeClicked = (node) => {
        console.log(node);
    };

    nodeFocused = (node) => {
        console.log(node);
    };

    nodeLostFocus = (node) => {
        console.log(node);
    };

    render() {
        // use React for rendering, d3 calculates x and y
        let nodes = this.props.nodes.map((node) => {
            let transform = 'translate(' + node.x + ',' + node.y + ')';
            return (
                <g className={classes.node} key={node.key} transform={transform}>
                    <circle onClick={() => this.nodeClicked(node)}
                            onMouseEnter={() => this.nodeFocused(node)}
                            onMouseLeave={() => this.nodeLostFocus(node)}
                            r={20} />
                    <text x={25}
                          dy='.35em'>{node.key}
                          </text>
                </g>
            );
        });
        let links = this.props.links.map((link) => {
            return (
                <line className={classes.link} markerEnd='url(#arrowhead)' key={link.key} strokeWidth={2}
                      x1={link.source.x} x2={link.target.x} y1={link.source.y} y2={link.target.y} />
            );
        });

        return (
            <svg width={this.props.width} height={this.props.height}>
                <defs>
                    <marker id="arrowhead" viewBox="0 -5 10 10" refX="28" refY="0" orient="auto" markerWidth="6" markerHeight="6">
                        <path d="M0,-5L10,0L0,5" fill="#999" style={{stroke: 'none'}} />
                    </marker>
                </defs>
                <g>
                    {links}
                    {nodes}
                </g>
            </svg>
        );
    }
}

export default Graph;