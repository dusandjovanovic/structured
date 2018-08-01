import React, {Component} from 'react';
import {InteractiveForceGraph, ForceGraph, ForceGraphNode, ForceGraphArrowLink, ForceGraphLink} from 'react-vis-force';

const twoChildren = [
    <ForceGraphNode node={{ id: 'first-node' }} fill="#11939A" />,
    <ForceGraphNode node={{ id: 'second-node' }} fill="#47d3d9" />,
    <ForceGraphLink link={{ source: 'first-node', target: 'second-node' }} />,
];

const twoChildrenArrow = [
    <ForceGraphNode node={{ id: 'first-node' }} fill="#11939A" />,
    <ForceGraphNode node={{ id: 'second-node' }} fill="#47d3d9" />,
    <ForceGraphArrowLink targetRadius={2} link={{ source: 'first-node', target: 'second-node' }} />,
];

const tenChildren = [
    <ForceGraphNode node={{ id: 'first-node', radius: 20 }} fill="#11939A" />,
    <ForceGraphNode node={{ id: 'second-node', radius: 20 }} fill="#47d3d9" />,
    <ForceGraphNode node={{ id: 'third-node', radius: 20 }} fill="#11939A" />,
    <ForceGraphNode node={{ id: 'fourth-node', radius: 20 }} fill="#47d3d9" />,
    <ForceGraphNode node={{ id: 'fifth-node', radius: 20 }} fill="#11939A" />,
    <ForceGraphNode node={{ id: 'sixth-node', radius: 20 }} fill="#47d3d9" />,
    <ForceGraphNode node={{ id: 'seventh-node', radius: 20 }} fill="#11939A" />,
    <ForceGraphNode node={{ id: 'eighth-node', radius: 20 }} fill="#47d3d9" />,
    <ForceGraphNode node={{ id: 'ninth-node', radius: 20 }} fill="#11939A" />,
    <ForceGraphNode node={{ id: 'tenth-node', radius: 20 }} fill="#47d3d9" />,
    <ForceGraphLink link={{ source: 'first-node', target: 'second-node' }} />,
    <ForceGraphLink link={{ source: 'third-node', target: 'second-node' }} />,
    <ForceGraphLink link={{ source: 'third-node', target: 'fourth-node' }} />,
    <ForceGraphLink link={{ source: 'fifth-node', target: 'fourth-node' }} />,
    <ForceGraphLink link={{ source: 'fifth-node', target: 'fourth-node' }} />,
    <ForceGraphLink link={{ source: 'sixth-node', target: 'fourth-node' }} />,
    <ForceGraphLink link={{ source: 'seventh-node', target: 'fourth-node' }} />,
    <ForceGraphLink link={{ source: 'eighth-node', target: 'fourth-node' }} />,
    <ForceGraphLink link={{ source: 'ninth-node', target: 'tenth-node' }} />,
    <ForceGraphLink link={{ source: 'tenth-node', target: 'fifth-node' }} />,
];

const tenChildrenArrows = [
    <ForceGraphNode zoomable node={{ id: 'first-node'}} fill="#11939A" />,
    <ForceGraphNode zoomable node={{ id: 'second-node'}} fill="#47d3d9" />,
    <ForceGraphNode zoomable node={{ id: 'third-node'}} fill="#11939A" />,
    <ForceGraphNode zoomable node={{ id: 'fourth-node'}} fill="#47d3d9" />,
    <ForceGraphNode zoomable node={{ id: 'fifth-node'}} fill="#11939A" />,
    <ForceGraphNode zoomable node={{ id: 'sixth-node'}} fill="#47d3d9" />,
    <ForceGraphNode zoomable node={{ id: 'seventh-node'}} fill="#11939A" />,
    <ForceGraphNode zoomable node={{ id: 'eighth-node'}} fill="#47d3d9" />,
    <ForceGraphNode zoomable node={{ id: 'ninth-node'}} fill="#11939A" />,
    <ForceGraphNode zoomable node={{ id: 'tenth-node'}} fill="#47d3d9" />,
    <ForceGraphArrowLink zoomable link={{ source: 'first-node', target: 'second-node' }} />,
    <ForceGraphArrowLink zoomable link={{ source: 'third-node', target: 'second-node' }} />,
    <ForceGraphArrowLink zoomable link={{ source: 'third-node', target: 'fourth-node' }} />,
    <ForceGraphArrowLink zoomable link={{ source: 'fifth-node', target: 'fourth-node' }} />,
    <ForceGraphArrowLink zoomable link={{ source: 'fifth-node', target: 'fourth-node' }} />,
    <ForceGraphArrowLink zoomable link={{ source: 'sixth-node', target: 'fourth-node' }} />,
    <ForceGraphArrowLink zoomable link={{ source: 'seventh-node', target: 'fourth-node' }} />,
    <ForceGraphArrowLink zoomable link={{ source: 'eighth-node', target: 'fourth-node' }} />,
    <ForceGraphArrowLink zoomable link={{ source: 'ninth-node', target: 'tenth-node' }} />,
    <ForceGraphArrowLink zoomable link={{ source: 'tenth-node', target: 'fifth-node' }} />,
];

class Graph extends Component {
    render() {
        return (
            <InteractiveForceGraph showLabels
                                   simulationOptions={{
                                       strength: {
                                           charge: -100
                                       }
                                   }}
                                   highlightDependencies
                                   zoomOptions={{ minScale: 0.1, maxScale: 5 }}
                                   zoom
            >
                {tenChildrenArrows}
            </InteractiveForceGraph>
        );
    };
}

export default Graph;