import React, { Component } from 'react';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

class Master extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <div />
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <Button className="btn btn-outline-secondary" disabled={this.props.disabled} onClick={() => this.props.randomGraph()}>Random graph ↺</Button>
                        <Button className="btn btn-outline-secondary" disabled={this.props.disabled} onClick={() => this.props.addNode()}>Add node ↳</Button>
                        <Button className="btn btn-outline-secondary" disabled={this.props.disabled} onClick={() => this.props.addEdge()}>Add edge ↯</Button>
                        <Button className="btn btn-outline-secondary" disabled={this.props.disabled} onClick={() => this.props.removeNode()}>Remove node</Button>
                        <Button className="btn btn-outline-secondary" disabled={this.props.disabled} onClick={() => this.props.removeEdge()}>Remove edge</Button>
                    </div>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Algorithms
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem header>Choose an animation</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={() => this.props.algorithmBreadth()}>Breadth-first search</DropdownItem>
                            <DropdownItem onClick={() => this.props.algorithmDepth()}>Depth-first search</DropdownItem>
                            <DropdownItem onClick={() => this.props.algorithmCanceled()}>Cancel</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        );
    };
};

export default Master;