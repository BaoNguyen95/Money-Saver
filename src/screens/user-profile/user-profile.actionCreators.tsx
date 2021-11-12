import * as actions from "./user-profile.actionTypes";
import { IAdminResponse } from "./user-profile.reducer";

export const getUserRequest = (): actions.GetUserRequest => {
    return {
        type: actions.GET_USERS_REQUEST,
    };
};

export const getUserSuccess = (
    data: IAdminResponse
): actions.GetUsersSuccess => {
    return {
        type: actions.GET_USERS_SUCCESS,
        data,
    };
};

export const getUsersFail = (data: IAdminResponse): actions.GetUsersFail => {
    return {
        type: actions.GET_USERS_FAIL,
        data,
    };
};
