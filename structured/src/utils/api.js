import base from "axios";

export const backendRoot = "http://localhost:2999";

export const authRoute = "/api/auth/login";
export const authRegisterRoute = "/api/auth/register";

export const roomCreateNewRoute = "/api/rooms";
export const roomJoinRoute = "/api/rooms/join";
export const roomLeaveRoute = "/api/rooms/leave";
export const roomGetAllRoute = mode => "/api/rooms/" + mode;
export const roomGetDataRoute = name => "/api/rooms/get/" + name;
export const roomGetGraphRoute = name => "/api/rooms/get-graph/" + name;
export const roomDeleteRoute = id => "/api/rooms/" + id;
export const roomChangeGraphRoute = name => "/api/rooms/" + name;

export const userGetDataRoute = username => "/api/user/" + username;
export const userGetHistoryRoute = username =>
    "/api/user/" + username + "/history";
export const userGetFriendRequestsRoute = username =>
    "/api/friend-request/" + username;
export const userAddHistoryRoute = username => "/api/user/" + username;
export const userFriendCheckRoute = "/api/friend-request/check";
export const userFriendAddRoute = "/api/friend-request/add";
export const userFriendConfirmRoute = "/api/friend-request/confirm";
export const userFriendDeleteRoute = id => "/api/friend-request/" + id;

export class axios {
    static instance = null;

    static getInstance() {
        if (axios.instance == null) {
            axios.instance = base.create({
                baseURL: backendRoot
            });
        }
        return axios.instance;
    }
}
