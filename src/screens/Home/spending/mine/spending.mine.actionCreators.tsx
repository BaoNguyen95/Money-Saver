import { ISpendingMoneyData } from "../../components/spending.dialog";
import * as actions from "./spending.mine.actionTypes";
import { ISpendingMineResponse } from "./spending.mine.reducer";

export const addNewSpendingMoneyRequest = (data: ISpendingMoneyData): actions.AddSpendingMoneyRequest => {
    return {
        type: actions.ADD_SPENDING_MONEY_REQUEST,
        data,
    };
};

export const addNewSpendingMoneySuccess = (
    data: ISpendingMineResponse
): actions.AddSpendingMoneySuccess => {
    return {
        type: actions.ADD_SPENDING_MONEY_SUCCESS,
        data,
    };
};

export const addNewSpendingMoneyFail = (data: ISpendingMineResponse): actions.AddSpendingMoneyFail => {
    return {
        type: actions.ADD_SPENDING_MONEY_FAIL,
        data,
    };
};

export const resetCreatedSuccess = (): actions.ResetCreatedSuccess => {
    return {
        type: actions.RESET_CREATED_SUCCESS,
    };
};

export const getSpendingMoneyMineRequest = (data: number): actions.GetSpendingMoneyMineRequest => {
    return {
        type: actions.GET_SPENDING_MONEY_MINE_REQUEST,
        data,
    };
};

export const getSpendingMoneyMineSuccess = (
    data: ISpendingMoneyData[]
): actions.GetSpendingMoneyMineSuccess => {
    return {
        type: actions.GET_SPENDING_MONEY_MINE_SUCCESS,
        data,
    };
};

export const getSpendingMoneyMineFail = (data: ISpendingMineResponse): actions.GetSpendingMoneyMineFail => {
    return {
        type: actions.GET_SPENDING_MONEY_MINE_FAIL,
        data,
    };
};

export const onDeletedGroup = (data: boolean): actions.DeletedGroup => {
    return {
        type: actions.DELETED_GROUP,
        data,
    };
};


