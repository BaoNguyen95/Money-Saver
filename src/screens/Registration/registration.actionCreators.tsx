import { IRegistrationState } from "./registration";
import * as actions from "./registration.actionTypes";
import { IAddUserResponse } from "./registration.reducer";

export const addUserRequest = (data: IRegistrationState): actions.AddUserRequest => {
    return {
        type: actions.ADD_USER_REQUEST,
        data
    };
};

export const addUserSuccess = (
    data: IAddUserResponse
): actions.AddUserSuccess => {
    return {
        type: actions.ADD_USER_SUCCESS,
        data,
    };
};

export const addUserFail = (data: IAddUserResponse): actions.AddUserFail => {
    return {
        type: actions.ADD_USER_FAIL,
        data,
    };
};
