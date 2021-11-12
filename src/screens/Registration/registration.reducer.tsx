import { showMessage } from "react-native-flash-message";
import { RESET_REDUCER } from "../../core/actionTypes";
import * as actions from "./registration.actionTypes";

export interface IAddUserResponse {
    id: string;
    message?: string;
    code?: number;
}

const initState: IAddUserResponse = {
    id: ""
};

const RegistrationReducer = (
    state = initState,
    action: actions.RegistrationActions
): IAddUserResponse => {
    switch (action.type) {
        case actions.ADD_USER_SUCCESS:
            return { ...state, ...action.data };
        case actions.ADD_USER_FAIL:
            return { ...state, message: 'error' };
        case RESET_REDUCER:
            return initState;
        default:
            return state;
    }
};

export default RegistrationReducer;
