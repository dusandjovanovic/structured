import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ExModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div className="ml-2 mr-2">
                <Button className={this.props.buttonClass} disabled={!this.props.buttonCondition} onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal className="modal-lg" isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>{this.props.title}</ModalHeader>
                    <ModalBody>
                        {this.props.children}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ExModal;