import { IUser } from "../../shared/models/common.model";
import * as actions from "./user-profile.actionTypes";

export interface IAdminResponse {
    listUsers: IUser[];
    message?: string;
}

const initState: IAdminResponse = {
    listUsers: [],
};

const AdminReducer = (
    state = initState,
    action: actions.AdminActions
): IAdminResponse => {
    switch (action.type) {
        case actions.GET_USERS_SUCCESS:
            return { ...state, listUsers: action.data.listUsers };
        case actions.GET_USERS_FAIL:
            return { ...state, message: action.data.message, listUsers: [] };
        default:
            return state;
    }
};

export default AdminReducer;
