import React, {Component} from 'react';
import * as d3 from 'd3';
import './graph.css';

class Graph extends Component {
    simulation = null;
    state = {
        nodeFocused: null,
        nodeSelected: null,
        nodeCurrent: null,
        nodeRoot: null,
        nodesClicked: []
    };
    componentWillMount() {
        this.simulation = d3.forceSimulation()
            .force("charge", d3.forceManyBody().strength(-500))
            .force("link", d3.forceLink().distance(250)
                .id(function id(node) {return node.key;}))
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
        console.log('graphObject:', nextProps);
        // d3's force function has side-effects and
        // mutates the nodes and links array directly
        // this.props.nodes/links will contain x and y values
        this.simulation.nodes(nextProps.nodes);
        this.simulation.force("link").links(nextProps.edges);
        this.simulation.alpha(1);
        this.simulation.restart();
    };

    componentWillUnmount() {
        this.simulation.stop();
    }

    assignClass = (node, edge) => {
        let assign = "";
        if (this.state.nodeSelected) {
            if (node.key === this.state.nodeSelected.key)
                assign = "Selected";
            else if (this.state.nodeCurrent && node.key === this.state.nodeCurrent.key)
                assign = "Current";
            else if (!edge) {
                node.inEdges.map(source => {
                    if (source === this.state.nodeSelected.key)
                        return assign = "Adjacent";
                    else
                        return assign;
                });
            }
        }
        else if (this.state.nodeFocused) {
            if (node.key === this.state.nodeFocused.key)
                assign = "Focused";
            else {
                assign = "Unfocused";
                if (!edge) {
                    node.inEdges.map(source => {
                        if (source === this.state.nodeFocused.key)
                            return assign = "Focused";
                        else
                            return assign;
                    });
                }
            }
        }
        else if (this.state.nodesClicked.includes(node.key)) {
                assign = "Selected";
        }
        return assign;
    };

    nodeClicked = (node) => {
        if (this.props.managed) {
            let newNodesClicked = this.state.nodesClicked.slice();
            newNodesClicked.push(node.key);
            this.setState({
                nodesClicked: newNodesClicked
            });
        }
        else if (!this.state.nodeSelected)
            this.setState({
                nodeSelected: node,
                nodeFocused: null
            });
        else
            this.setState({
                nodeSelected: null,
                nodeFocused: null
            });
    };

    nodeFocused = (node) => {
        if (!this.props.managed && !this.state.nodeSelected)
            this.setState({
                nodeFocused: node
            });
    };

    nodeLostFocus = (node) => {
        if (!this.props.managed)
            this.setState({
                nodeFocused: null
            });
    };

    surfaceClicked = () => {
        if (!this.props.managed && this.state.nodeSelected)
            this.setState({
                nodeSelected: null
            });
    };

    render() {
        // use React for rendering, d3 calculates x and y
        let nodes = this.props.nodes.map((node) => {
            let assignClass = this.assignClass(node, false);
            let transform = 'translate(' + node.x + ',' + node.y + ')';
            return (
                <g className={"Node " + assignClass} key={node.key} transform={transform}>
                    <circle onClick={() => this.nodeClicked(node)}
                            onMouseEnter={() => this.nodeFocused(node)}
                            onMouseLeave={() => this.nodeLostFocus(node)}
                            r={20} />
                    <text x={25} dy='.35em'>{node.key}</text>
                </g>
            );
        });
        let links = this.props.edges.map((link) => {
            let assignClass = this.assignClass(link.source, true);
            let arrow = 'url(#arrowhead)';
            if (assignClass.includes('Focused') || assignClass.includes('Selected'))
                arrow = 'url(#focusedArrowhead)';
            else if (assignClass.includes('Unfocused'))
                arrow = 'url(#unfocusedArrowhead)';
            return (
                <line className={"Edge " + assignClass} markerEnd={arrow} key={link.key} strokeWidth={2}
                      x1={link.source.x} x2={link.target.x} y1={link.source.y} y2={link.target.y} />
            );
        });

        return (
            <svg className="Container" width={this.props.width} height={this.props.height} onClick={() => this.surfaceClicked()}>
                <defs>
                    <marker id="arrowhead" viewBox="0 -5 10 10" refX="28" refY="0" orient="auto" markerWidth="6" markerHeight="6">
                        <path d="M0,-5L10,0L0,5" fill="#e0e0e0" style={{stroke: 'none'}} />
                    </marker>
                    <marker id="focusedArrowhead" viewBox="0 -5 10 10" refX="28" refY="0" orient="auto" markerWidth="6" markerHeight="6">
                        <path d="M0,-5L10,0L0,5" fill="#94d6e9" style={{stroke: 'none'}} />
                    </marker>
                    <marker id="unfocusedArrowhead" viewBox="0 -5 10 10" refX="28" refY="0" orient="auto" markerWidth="6" markerHeight="6">
                        <path d="M0,-5L10,0L0,5" fill="#f0f0f0" style={{stroke: 'none'}} />
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