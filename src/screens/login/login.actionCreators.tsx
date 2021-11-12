import { ILoginState } from "./login";
import * as actions from "./login.actionTypes";
import { IGetRoleResponse, IGetUserResponse, ILoginResponse } from "./login.reducer";

export const LoginRequest = (data: ILoginState): actions.LoginRequest => {
    return {
        type: actions.LOGIN_REQUEST,
        data
    };
};

export const LoginSuccess = (
    data: ILoginResponse
): actions.LoginSuccess => {
    return {
        type: actions.LOGIN_SUCCESS,
        data,
    };
};

export const LoginFail = (data: ILoginResponse): actions.LoginFail => {
    return {
        type: actions.LOGIN_FAIL,
        data,
    };
};

export const getRolesRequest = (): actions.GetRoleRequest => {
    return {
        type: actions.GET_ROLES_REQUEST,
    };
};

export const getRolesSuccess = (
    data: IGetRoleResponse
): actions.GetRoleSuccess => {
    return {
        type: actions.GET_ROLES_SUCCESS,
        data,
    };
};

export const getRolesFail = (data: IGetRoleResponse): actions.GetRoleFail => {
    return {
        type: actions.GET_ROLES_FAIL,
        data,
    };
};

export const getUserRequest = (data: string): actions.GetUserRequest => {
    return {
        type: actions.GET_USER_REQUEST,
        data
    };
};

export const getUserSuccess = (
    data: IGetUserResponse
): actions.GetUserSuccess => {
    return {
        type: actions.GET_USER_SUCCESS,
        data,
    };
};

export const getUserFail = (data: IGetUserResponse): actions.GetUserFail => {
    return {
        type: actions.GET_USER_FAIL,
        data,
    };
};