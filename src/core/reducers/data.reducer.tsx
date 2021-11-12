import { IOptions } from "@moneysaver/shared/components";
import { SPENDING_TYPE } from "@moneysaver/shared/constants/common.constants";
import { IResponse, IUser } from "@moneysaver/shared/models/common.model";
import * as actions from "../actionTypes";

export interface IGetAppDataResponse extends IResponse {
    listSpendingType?: IOptions[];
    listBill?: IOptions[];
    listUser?: IUser[];
}

const initState: IGetAppDataResponse = {
    listSpendingType: [],
    listBill: [],
    listUser: [],
};

const AppDataReducer = (
    state = initState,
    action: actions.AppDataAction
): IGetAppDataResponse => {
    switch (action.type) {
        case actions.GET_SPENDING_TYPE_SUCCESS:
        case actions.GET_LIST_USER_SUCCESS:
            return { ...state, ...action.data };
        case actions.GET_BILL_SUCCESS:
            return { ...state, ...action.data };
        case actions.GET_SPENDING_TYPE_FAIL:
        case actions.GET_BILL_FAIL:
        case actions.GET_LIST_USER_FAIL:
            return { ...state, message: action.data.message };
        default:
            return state;
    }
};

export default AppDataReducer;
