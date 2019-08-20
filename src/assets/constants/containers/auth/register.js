export const formElements = {
	username: {
		id: "username",
		value: "",
		config: {
			type: "text",
			placeholder: "username",
			label: "Enter your desired username"
		},
		rules: {
			minLength: 1,
			required: true,
			email: false
		},
		valid: false,
		touched: false
	},
	password: {
		id: "password",
		value: "",
		config: {
			type: "password",
			placeholder: "password",
			label: "Enter your password"
		},
		rules: {
			minLength: 5,
			required: true,
			email: false
		},
		valid: false,
		touched: false
	},
	repeatPassword: {
		id: "repeatPassword",
		value: "",
		config: {
			type: "password",
			placeholder: "password",
			label: "Repeat password"
		},
		rules: {
			minLength: 5,
			required: true,
			email: false
		},
		valid: false,
		touched: false
	}
};
