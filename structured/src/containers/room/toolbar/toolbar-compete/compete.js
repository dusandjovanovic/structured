import React, { Component } from 'react';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

class Compete extends Component {
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
                    <h4 className="m-auto" style={{position: 'absolute', left: '0%', paddingLeft: '1.5rem'}}>
                        {this.props.competeType === 'ALGORITHM_BREADTH'
                            ? 'Breadth-first search'
                            : 'Depth-first search'
                        }
                    </h4>
                    <div className="btn-group mr-2">
                        <Button outline color="info" disabled={this.props.graphManaged} onClick={() => this.props.randomGraph()}><i className="fas fa-code-branch"></i> Random graph</Button>
                        <Button outline color="info" disabled={this.props.graphManaged || !this.props.graphExists} onClick={() => this.props.competeBegin()}><i className="fab fa-stack-overflow"></i> Begin</Button>
                        <Button outline color="secondary" disabled={!this.props.graphManaged} onClick={() => this.props.competeEnded()}><i className="fas fa-check"></i> Submit result</Button>
                    </div>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle disabled={this.props.graphManaged} caret>
                            Algorithms
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem header>Choose an algorithm</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={() => this.props.competeBreadth()}>Breadth-first search (default)</DropdownItem>
                            <DropdownItem onClick={() => this.props.competeDepth()}>Depth-first search</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        );
    };
};

export default Compete;
