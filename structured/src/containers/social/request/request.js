import React, {Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../../components/user-interface/input/input';
import Button from '../../../components/user-interface/button/button';
import Spinner from '../../../components/user-interface/spinner/spinner';
import * as actions from '../../../redux/actions/index';
import classes from './request.css';

class Request extends Component {
    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'username',
                    placeholder: this.props.placeholder
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            }
        }
    };

    checkValidity (value, rules) {
        let isValid = true;
        if (rules.required)
            isValid = value.trim() !== '' && isValid;
        if (rules.minLength)
            isValid = value.length >= rules.minLength && isValid;
        if (rules.maxLength)
            isValid = value.length <= rules.maxLength && isValid;
        return isValid;
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState({
            controls: updatedControls
        });
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAddFriend(this.props.sender, this.state.controls.username.value);
    };

    render() {
        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElements.map(element => (
            <Input elementType={element.config.elementType}
                   elementConfig={element.config.elementConfig}
                   value={element.config.value}
                   changed={(event) => this.inputChangedHandler(event, element.id)}
                   invalid={!element.config.valid}
                   shouldValidate={element.config.validation}
                   touched={element.config.touched}
                   key={element.id}/>

        ));
        let errorMessage = null;
        if (this.props.error)
            errorMessage = (<p>{this.props.error}</p>);

        return (
            <div className={classes.Requests}>
                {errorMessage}
                <p className>{this.props.info}</p>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    };
}

export default Request;