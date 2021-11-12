import { IResponse, IRole } from "../../shared/models/common.model";
import { ILoginState } from "./login";
import { IGetRoleResponse, ILoginResponse, IGetUserResponse } from "./login.reducer";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export interface LoginSuccess {
    type: typeof LOGIN_SUCCESS,
    data: ILoginResponse,
}

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export interface LoginRequest {
    type: typeof LOGIN_REQUEST,
    data: ILoginState,
}

export const LOGIN_FAIL = "LOGIN_FAIL";
export interface LoginFail {
    type: typeof LOGIN_FAIL,
    data: IResponse
}

export const LOGOUT = "LOGOUT";
export interface LOGOUT {
    type: typeof LOGOUT,
}


export const GET_ROLES_SUCCESS = "GET_ROLES_SUCCESS";
export interface GetRoleSuccess {
    type: typeof GET_ROLES_SUCCESS,
    data: IGetRoleResponse
}

export const GET_ROLES_REQUEST = "GET_ROLES_REQUEST";
export interface GetRoleRequest {
    type: typeof GET_ROLES_REQUEST,
}

export const GET_ROLES_FAIL = "GET_ROLES_FAIL";
export interface GetRoleFail {
    type: typeof GET_ROLES_FAIL,
    data: IResponse
}

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export interface GetUserSuccess {
    type: typeof GET_USER_SUCCESS,
    data: IGetUserResponse
}

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export interface GetUserRequest {
    type: typeof GET_USER_REQUEST,
    data: string
}

export const GET_USER_FAIL = "GET_USER_FAIL";
export interface GetUserFail {
    type: typeof GET_USER_FAIL,
    data: IGetUserResponse
}

export type LoginActions = LoginRequest | LoginSuccess | LoginFail | LOGOUT;

export type GetRolesAction = GetRoleSuccess | GetRoleRequest | GetRoleFail;

export type GetUserAction = GetUserSuccess | GetUserRequest | GetUserFail | LOGOUT;
