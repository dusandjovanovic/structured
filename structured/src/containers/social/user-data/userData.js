import React, {Component} from 'react';
import { Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import {HorizontalBar} from 'react-chartjs-2';

class userData extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);

        // tbd.. transform props and assign to dataset

        this.state = {
            dropdownOpen: false,
            userData: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [{
                        label: 'scores',
                        backgroundColor: 'rgba(97, 218, 251, 0.2)',
                        borderColor: 'rgba(64, 172, 201, 1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(78, 189, 219, 0.4)',
                        hoverBorderColor: 'rgba(64, 172, 201, 1)',
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }]
            }
        }
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (
            <div>
                <div className="ml-sm-auto pt-3 px-4 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <div />
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <Button outline="info" onClick={() => this.props.userUnselectedHandler()}><i className="fas fa-chevron-left"></i> Back</Button>
                        <h4 className="m-auto" style={{position: 'absolute', left: '0%', paddingLeft: '1.5rem'}}>
                            User dashboard
                        </h4>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                <i className="far fa-calendar-alt"></i> This week
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem divider />
                                <DropdownItem>This week</DropdownItem>
                                <DropdownItem>This month</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <Container>
                    <HorizontalBar data={this.state.userData} />
                </Container>
            </div>
        );
    };
}

export default userData;