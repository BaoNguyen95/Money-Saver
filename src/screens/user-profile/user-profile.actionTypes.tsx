import { IAdminResponse } from "./user-profile.reducer";

export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export interface GetUsersSuccess {
    type: typeof GET_USERS_SUCCESS,
    data: IAdminResponse,
}

export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
export interface GetUserRequest {
    type: typeof GET_USERS_REQUEST
}

export const GET_USERS_FAIL = "GET_USERS_FAIL";
export interface GetUsersFail {
    type: typeof GET_USERS_FAIL,
    data: IAdminResponse,
}

export type AdminActions = GetUsersSuccess | GetUserRequest | GetUsersFail;
