export const stack = (data = [], t = 0) => {
	let dataStore = data;
	let top = t;

	const stackProto = {
		push(element) {
			dataStore[top++] = element;
		},
		pop: () => dataStore.splice(--top, 1),
		peek: () => dataStore[top - 1],
		length: () => top,
		isEmpty: () => top === 0,
		getStack: () => dataStore.map(element => element)
	};

	return Object.create(stackProto);
};
