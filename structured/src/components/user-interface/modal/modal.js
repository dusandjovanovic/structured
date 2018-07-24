import React, {Component} from 'react';
import classes from './Modal.css';
import Wrapper from '../../../components-higher/wrapper/wrapper'
import Backdrop from '../backdrop/backdrop'

class Modal extends Component {

    render() {
        return (
            <Wrapper>
                <Backdrop show={props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal} style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </Wrapper>
        );
    }
}

export default Modal;