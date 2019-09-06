import React from "react";
import PropTypes from "prop-types";

import isEqual from "lodash/isEqual";
import forEach from "lodash/forEach";
import { funcValidateEmail } from "../../../utils/functions/validationFunctions";

class FormContainer extends React.Component {
	state = {
		inputs: null,
		defaults: null
	};

	static getDerivedStateFromProps(props, state) {
		if (
			!state.defaults ||
			(props.formDefaults && !isEqual(state.defaults, props.formDefaults))
		)
			return {
				inputs: {
					...Object.keys(props.formElements).reduce(
						(accumulated, current) => ({
							...accumulated,
							[current]: {
								id: props.formElements[current].id,
								value:
									props.formDefaults &&
									props.formDefaults[current]
										? props.formDefaults[current]
										: props.formElements[current].value,
								valueUrl:
									props.formDefaults &&
									props.formDefaults[current.concat("Url")]
										? props.formDefaults[
												current.concat("Url")
										  ]
										: props.formElements[current].value,
								valid:
									props.formDefaults &&
									(props.formDefaults[current] ||
										props.formDefaults[
											current.concat("Url")
										])
										? true
										: props.formElements[current].rules
												.required
										? props.formElements[current].valid
										: true,
								touched:
									props.formDefaults &&
									props.formDefaults[current]
										? true
										: props.formElements[current].touched,
								config: Object.assign(
									{},
									props.formElements[current].config
								),
								rules: Object.assign(
									{},
									props.formElements[current].rules
								),
								media: props.formElements[current].media
							}
						}),
						Object.assign({})
					)
				},
				defaults: {
					...props.formDefaults
				}
			};
		else return null;
	}

	inputChangedHandler = (event, inputName) => {
		event.persist();
		this.setState(() => ({
			inputs: {
				...this.state.inputs,
				[inputName]: {
					...this.state.inputs[inputName],
					value: event.target.value,
					valid: this.validateInput(
						event.target.value,
						this.state.inputs[inputName].rules
					),
					touched: true
				}
			}
		}));
	};

	mediaChangedHandler = (file, fileUrl, inputName) => {
		this.setState(() => ({
			inputs: {
				...this.state.inputs,
				[inputName]: {
					...this.state.inputs[inputName],
					value: file,
					valueUrl: fileUrl,
					valid: this.validateMediaInput(
						fileUrl,
						this.state.inputs[inputName].rules
					),
					touched: true
				}
			}
		}));
	};

	valid = () => {
		return [...Object.keys(this.state.inputs)].every(
			element => this.state.inputs[element].valid
		);
	};

	submitHandler = event => {
		if (event) event.preventDefault();

		if (!this.validateForm()) {
			this.props.errorHandler({
				hasError: true,
				name: "Some fields are missing",
				description:
					"Required fields are necessary. Make sure to specify all of them."
			});
		} else if (!this.validateMedia()) {
			this.props.errorHandler({
				hasError: true,
				name: "Media element is missing",
				description:
					"You did not provide a media element. Make sure to specify a video/image file."
			});
		} else {
			this.props.submitHandler({
				...Object.keys(this.state.inputs).reduce(
					(accumulated, current) => ({
						...accumulated,
						[current]: {
							value: this.state.inputs[current].value,
							valueUrl: this.state.inputs[current].valueUrl
								? this.state.inputs[current].valueUrl
								: null
						}
					}),
					Object.assign({})
				)
			});
		}
	};

	validateInput = (value, rules) => {
		let validInput = true;
		if (rules.required) validInput = value.trim() !== "" && validInput;
		if (rules.minLength)
			validInput = value.length >= rules.minLength && validInput;
		if (rules.maxLength)
			validInput = value.length <= rules.maxLength && validInput;
		if (rules.minValue) validInput = value >= rules.minValue && validInput;
		if (rules.maxValue) validInput = value <= rules.maxValue && validInput;
		if (rules.email) validInput = funcValidateEmail(value);

		return validInput;
	};

	validateMediaInput = (value, rules) => {
		let validInput = true;
		if (rules.required) validInput = value !== null && validInput;

		return validInput;
	};

	validateForm = () => {
		let inputs = {};
		let validForm = true;
		forEach(this.state.inputs, (item, key) => {
			if (!item.media) {
				validForm = item.valid && validForm;
				inputs[key] = {
					...item,
					touched: true
				};
			}
		});
		this.setState({ inputs });
		return validForm;
	};

	validateMedia = () => {
		let validForm = true;
		forEach(this.state.inputs, item => {
			if (item.media) validForm = item.valid && validForm;
		});
		return validForm;
	};

	render() {
		return (
			<React.Fragment>
				{this.props.children({
					...this.state,
					valid: () => this.valid(),
					submitHandler: this.submitHandler,
					inputChangedHandler: this.inputChangedHandler,
					mediaChangedHandler: this.mediaChangedHandler
				})}
			</React.Fragment>
		);
	}
}

FormContainer.propTypes = {
	formElements: PropTypes.object.isRequired,
	formDefaults: PropTypes.object,
	submitHandler: PropTypes.func.isRequired,
	errorHandler: PropTypes.func.isRequired,
	children: PropTypes.func.isRequired,
	required: PropTypes.bool
};

export default FormContainer;
