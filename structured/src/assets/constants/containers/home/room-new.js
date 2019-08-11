export const formElements = {
    name: {
        id: "name",
        value: "",
        config: {
            type: "text",
            placeholder: "name",
            label: "Enter the name of room you are making"
        },
        rules: {
            minLength: 1,
            maxLength: 128,
            required: true,
            email: false
        },
        valid: false,
        touched: false
    }
};
