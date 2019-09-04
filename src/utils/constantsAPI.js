import base from "axios";

export const backendRoot = "http://localhost:8080";
export const backendIOGraph = "http://localhost:65080/graph";
export const backendIOMessaging = "http://localhost:65080/chat";

// production server
// export const backendRoot = "https://structured-backend.appspot.com";
// export const backendIOGraph = "https://structured-backend.appspot.com/graph";
// export const backendIOMessaging = "https://structured-backend.appspot.com/chat";

export const authLoginRoute = "/api/login";
export const authRegisterRoute = "/api/register";
export const authLogoutRoute = "/api/logout";

export const roomCreateNewRoute = "/api/room/create";
export const roomJoinRoute = "/api/room/join";
export const roomLeaveRoute = "/api/room/leave";
export const roomGetAllRoute = mode => "/api/room/" + mode;
export const roomGetDataRoute = name => "/api/room/get/" + name;
export const roomGetGraphRoute = id => "/api/graph/" + id;
export const roomChangeGraphRoute = id => "/api/graph/" + id;
export const roomGetTraversalRoute = name => "/api/room/traversal/" + name;
export const roomChangeTraversalRoute = name => "/api/room/traversal/" + name;
export const roomDeleteRoute = id => "/api/room/" + id;

export const userGetDataRoute = username => "/api/user/" + username;
export const userGetHistoryRoute = username =>
	"/api/user/" + username + "/history";
export const userAddHistoryRoute = username =>
	"/api/user/" + username + "/history";
export const userGetFriendRequestsRoute = username =>
	"/api/friend-request/" + username;
export const userFriendCheckRoute = "/api/friend-request/check";
export const userFriendAddRoute = "/api/friend-request/add";
export const userFriendConfirmRoute = "/api/friend-request/confirm";
export const userFriendDeleteRoute = id => "/api/friend-request/" + id;

export class axios {
	static instance = null;

	static getInstance() {
		if (axios.instance == null) {
			axios.instance = base.create({
				baseURL: backendRoot,
				withCredentials: true
			});
		}
		return axios.instance;
	}
}
