import { handleError } from "@moneysaver/shared/services/app.service";
import { IResponse, IRole, IUser } from "../../shared/models/common.model";
import * as actions from "./login.actionTypes";

export interface ILoginResponse extends IResponse {
    id: string;
    isLogin: boolean;
}

const initState: ILoginResponse = {
    isLogin: false,
    id: '',
};

export interface IGetRoleResponse extends IResponse {
    roles: IRole[];
}

const initRoleState: IGetRoleResponse = {
    roles: [],
    message: '',
}

export interface IGetUserResponse extends IUser, IResponse {

}

const initStateUser: IUser = {
    username: "",
    id: '',
    roleId: '',
    displayName: '',
}


export const LoginReducer = (
    state = initState,
    action: actions.LoginActions
): ILoginResponse => {
    switch (action.type) {
        case actions.LOGIN_SUCCESS:
            if (action.data.message) {
                handleError({ ...action.data })
            }
            return { ...state, ...action.data };
        case actions.LOGIN_FAIL:
            if (action.data.message) {
                handleError({ ...action.data })
            }
            return { ...state, message: action.data.message };
        case actions.LOGOUT:
            return initState;
        default:
            return state;
    }
};


export const RolesReducer = (
    state = initRoleState,
    action: actions.GetRolesAction
): IGetRoleResponse => {
    switch (action.type) {
        case actions.GET_ROLES_SUCCESS:
            return { ...state, ...action.data };
        case actions.GET_ROLES_FAIL:
            return { ...state, message: action.data.message };
        default:
            return state;
    }
};

export const UserReducer = (state = initStateUser, action: actions.GetUserAction): IGetUserResponse => {
    switch (action.type) {
        case actions.GET_USER_SUCCESS:
            return { ...state, ...action.data };
        case actions.GET_USER_FAIL:
            return { ...state, message: action.data.message };
        case actions.LOGOUT:
            return initStateUser;
        default:
            return state;
    }
}


