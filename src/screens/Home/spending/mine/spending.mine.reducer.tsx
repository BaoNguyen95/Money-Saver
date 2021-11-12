import { IResponse } from "@moneysaver/shared/models/common.model";
import { ISpendingMoneyData } from "../../components/spending.dialog";
import * as actions from "@moneysaver/core/actionTypes";

export interface ISpendingMineResponse extends IResponse {
    success?: boolean
    listSpendingMoney?: ISpendingMoneyData[];
    reload?: boolean
}

const initState: ISpendingMineResponse = {
    success: false,
    listSpendingMoney: [],
    reload: true,
};

const SpendingMineReducer = (
    state = initState,
    action: actions.SpendingMineActions
): ISpendingMineResponse => {
    switch (action.type) {
        case actions.ADD_SPENDING_MONEY_SUCCESS:
            return { ...state, ...action.data };
        case actions.ADD_SPENDING_MONEY_FAIL:
            return { ...state, message: action.data.message };
        case actions.RESET_CREATED_SUCCESS:
            return { ...state, success: false };
        case actions.LOGOUT:
            return initState;
        case actions.DELETED_GROUP:
            return { ...state, reload: action.data };
        default:
            return state;
    }
};

export default SpendingMineReducer;
