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
                        <Button outline color="info" disabled={this.props.disabled} onClick={() => this.props.randomGraph()}><i className="fas fa-code-branch"></i> Random graph</Button>
                        <Button outline color="info" disabled={this.props.disabled} onClick={() => this.props.addNode()}><i className="fas fa-plus"></i> Add node</Button>
                        <Button outline color="info" disabled={this.props.disabled} onClick={() => this.props.addEdge()}><i className="fas fa-link"></i> Add edge</Button>
                        <Button outline disabled={this.props.disabled} onClick={() => this.props.removeNode()}><i className="fas fa-eraser"></i> Remove node</Button>
                        <Button outline disabled={this.props.disabled} onClick={() => this.props.removeEdge()}><i className="fas fa-unlink"></i> Remove edge</Button>
                    </div>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Algorithms
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem header>Choose an animation</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={() => this.props.algorithmBegin('ALGORITHM_BREADTH')}>Breadth-first search</DropdownItem>
                            <DropdownItem onClick={() => this.props.algorithmBegin('ALGORITHM_DEPTH')}>Depth-first search</DropdownItem>
                            <DropdownItem onClick={() => this.props.algorithmCanceled()}>Cancel</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        );
    };
};

export default Master;