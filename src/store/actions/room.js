import {
	axios,
	roomJoinRoute,
	roomLeaveRoute,
	roomGetAllRoute,
	roomGetDataRoute,
	roomGetGraphRoute,
	roomChangeGraphRoute,
	roomGetTraversalRoute,
	roomChangeTraversalRoute,
	roomDeleteRoute,
	roomCreateNewRoute
} from "../../utils/constantsAPI";

import {
	ROOM_INIT,
	ROOM_END,
	ROOM_DATA,
	ROOM_ALL,
	ROOM_CREATE,
	ROOM_ADD,
	ROOM_DELETE,
	ROOM_JOIN,
	ROOM_LEAVE,
	ROOM_GRAPH_CHANGE,
	ROOM_TRAVERSAL_CHANGE,
	ROOM_ERROR
} from "../actions.js";

const roomCreate = name => {
	return {
		type: ROOM_CREATE,
		name: name
	};
};

const roomAdd = room => {
	return {
		type: ROOM_ADD,
		room: room
	};
};

const roomDelete = () => {
	return {
		type: ROOM_DELETE
	};
};

const roomJoin = (name, master = false) => {
	return {
		type: ROOM_JOIN,
		name: name,
		master: master
	};
};

const roomLeave = username => {
	return {
		type: ROOM_LEAVE,
		username: username
	};
};

const roomInitiate = () => {
	return {
		type: ROOM_INIT
	};
};

const roomEnd = () => {
	return {
		type: ROOM_END
	};
};

const roomData = (data, master, overwriteGraph) => {
	return {
		type: ROOM_DATA,
		master: master,
		data: data,
		overwriteGraph: overwriteGraph
	};
};

const roomAll = rooms => {
	return {
		type: ROOM_ALL,
		rooms: rooms
	};
};

const roomGraphChange = graph => {
	return {
		type: ROOM_GRAPH_CHANGE,
		graph: graph
	};
};

const roomTraversalChange = graphTraversed => {
	return {
		type: ROOM_TRAVERSAL_CHANGE,
		graphTraversed: graphTraversed
	};
};

const roomError = error => {
	return {
		type: ROOM_ERROR,
		error: error
	};
};

export const roomGetAll = (mode = "all") => {
	return async dispatch => {
		let response;

		try {
			response = await axios.getInstance().get(roomGetAllRoute(mode));

			if (response.data.success) {
				dispatch(roomAll(response.data.data));
			} else {
				dispatch(roomError(response.data.message));
			}
		} catch (error) {
			dispatch(roomError(error.response.data.message));
		}

		return response;
	};
};

export const roomGetData = (name, overwriteGraph = true) => {
	return async (dispatch, getState) => {
		let response;

		try {
			response = await axios.getInstance().get(roomGetDataRoute(name));

			if (response.data.success) {
				dispatch(
					roomData(
						response.data.data,
						getState().auth.username ===
							response.data.data.createdBy,
						overwriteGraph
					)
				);
			} else {
				dispatch(roomError(response.data.message));
			}
		} catch (error) {
			dispatch(roomError(error.response.data.message));
		}

		return response;
	};
};

export const roomCreateNew = (name, maxUsers, roomType) => {
	return async (dispatch, getState) => {
		dispatch(roomInitiate());
		const payload = {
			name: name,
			maxUsers: maxUsers,
			roomType: roomType,
			createdBy: getState().auth.username
		};

		try {
			const response = await axios
				.getInstance()
				.post(roomCreateNewRoute, payload, {
					"Content-Type": "application/x-www-form-urlencoded"
				});

			if (response.data.success) {
				const roomData = await dispatch(roomGetData(name));
				dispatch(roomAdd(roomData.data.data));
				dispatch(roomCreate(roomData.data.data.name));
				dispatch(roomEnd());
			} else {
				dispatch(roomError(response.data.message));
			}
		} catch (error) {
			dispatch(roomError(error.response.data.message));
		}
	};
};

export const roomJoinExisting = name => {
	return async (dispatch, getState) => {
		const username = getState().auth.username;

		dispatch(roomInitiate());
		const payload = {
			roomName: name,
			username: username
		};

		try {
			const response = await axios
				.getInstance()
				.post(roomJoinRoute, payload, {
					"Content-Type": "application/x-www-form-urlencoded"
				});

			if (response.data.success) {
				const roomData = await dispatch(roomGetData(name));
				dispatch(
					roomJoin(
						roomData.data.data.name,
						roomData.data.data.createdBy === username
					)
				);
				dispatch(roomEnd());
			} else {
				dispatch(roomError(response.data.message));
			}
		} catch (error) {
			dispatch(roomError(error.response.data.message));
		}
	};
};

export const roomLeaveExisting = roomDeleted => {
	return async (dispatch, getState) => {
		dispatch(roomInitiate());
		const payload = {
			roomName: getState().room.data.name,
			username: getState().auth.username
		};
		let response;

		if (roomDeleted) {
			dispatch(roomLeave(getState().auth.username));
			dispatch(roomDelete());
			dispatch(roomEnd());
		} else {
			try {
				response = await axios
					.getInstance()
					.post(roomLeaveRoute, payload, {
						"Content-Type": "application/x-www-form-urlencoded"
					});

				if (response.data.success) {
					dispatch(roomLeave(getState().auth.username));
					dispatch(roomAll(response.data.rooms));
					dispatch(roomEnd());
				} else {
					dispatch(roomError(response.data.message));
				}
			} catch (error) {
				dispatch(roomError(error.response.data.message));
			}
		}

		return response;
	};
};

export const roomDeleteExisting = () => {
	return async (dispatch, getState) => {
		dispatch(roomInitiate());
		const roomId = getState().room.data["_id"];
		const username = getState().auth.username;

		try {
			const response = await axios
				.getInstance()
				.delete(roomDeleteRoute(roomId));

			if (response.data.success) {
				dispatch(roomLeave(username));
				dispatch(roomDelete());
				dispatch(roomAll(response.data.rooms));
				dispatch(roomEnd());
			} else {
				dispatch(roomError(response.data.message));
			}
		} catch (error) {
			dispatch(roomError(error.response.data.message));
		}
	};
};

export const roomGetGraph = () => {
	return async (dispatch, getState) => {
		const graphId = getState().room.data.graphId;
		let response;

		try {
			response = await axios
				.getInstance()
				.get(roomGetGraphRoute(graphId));

			if (response.data.success) {
				dispatch(roomGraphChange(response.data.data));
			} else {
				dispatch(roomError(response.data.message));
			}
		} catch (error) {
			dispatch(roomError(error.response.data.message));
		}

		return response;
	};
};

export const roomChangeGraph = graph => {
	return async (dispatch, getState) => {
		const graphId = getState().room.data.graphId;
		let response;
		const payload = {
			graph: graph
		};

		try {
			response = await axios
				.getInstance()
				.put(roomChangeGraphRoute(graphId), payload, {
					"Content-Type": "application/x-www-form-urlencoded"
				});

			if (response.data.success) {
				dispatch(roomGraphChange(graph));
			} else {
				dispatch(roomError(response.data.message));
			}
		} catch (error) {
			dispatch(roomError(error.response.data.message));
		}

		return response;
	};
};

export const roomGetTraversal = () => {
	return async (dispatch, getState) => {
		const roomName = getState().room.data.name;
		let response;

		try {
			response = await axios
				.getInstance()
				.get(roomGetTraversalRoute(roomName));

			if (response.data.success) {
				dispatch(roomTraversalChange(response.data.graphTraversed));
			} else {
				dispatch(roomError(response.data.message));
			}
		} catch (error) {
			dispatch(roomError(error.response.data.message));
		}

		return response;
	};
};

export const roomChangeTraversal = graphTraversed => {
	return async (dispatch, getState) => {
		const roomName = getState().room.data.name;
		let response;
		const payload = {
			graphTraversed: graphTraversed
		};

		try {
			response = await axios
				.getInstance()
				.put(roomChangeTraversalRoute(roomName), payload, {
					"Content-Type": "application/x-www-form-urlencoded"
				});

			if (response.data.success) {
				dispatch(roomTraversalChange(response.data.graphTraversed));
			} else {
				dispatch(roomError(response.data.message));
			}
		} catch (error) {
			dispatch(roomError(error.response.data.message));
		}

		return response;
	};
};
