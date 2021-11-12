import { ResetReducer } from "../../core/actionTypes";
import { IResponse } from "../../shared/models/common.model";
import { IRegistrationState } from "./registration";
import { IAddUserResponse } from "./registration.reducer";

export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export interface AddUserSuccess {
    type: typeof ADD_USER_SUCCESS,
    data: IAddUserResponse,
}

export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export interface AddUserRequest {
    type: typeof ADD_USER_REQUEST,
    data: IRegistrationState,
}

export const ADD_USER_FAIL = "ADD_USER_FAIL";
export interface AddUserFail {
    type: typeof ADD_USER_FAIL,
    data: IResponse,
}

export type RegistrationActions = AddUserRequest | AddUserSuccess | AddUserFail | ResetReducer;
