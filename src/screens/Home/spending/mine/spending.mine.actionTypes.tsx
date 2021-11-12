import { LOGOUT } from "@moneysaver/core/actionTypes";
import { ISpendingMoneyData } from "../../components/spending.dialog";
import { ISpendingMineResponse } from "./spending.mine.reducer";

export const ADD_SPENDING_MONEY_SUCCESS = "ADD_SPENDING_MONEY_SUCCESS";
export interface AddSpendingMoneySuccess {
    type: typeof ADD_SPENDING_MONEY_SUCCESS,
    data: ISpendingMineResponse,
}

export const ADD_SPENDING_MONEY_REQUEST = "ADD_SPENDING_REQUEST";
export interface AddSpendingMoneyRequest {
    type: typeof ADD_SPENDING_MONEY_REQUEST,
    data: ISpendingMoneyData
}

export const ADD_SPENDING_MONEY_FAIL = "ADD_SPENDING_FAIL";
export interface AddSpendingMoneyFail {
    type: typeof ADD_SPENDING_MONEY_FAIL,
    data: ISpendingMineResponse,
}

export const RESET_CREATED_SUCCESS = "RESET_CREATED_SUCCESS";
export interface ResetCreatedSuccess {
    type: typeof RESET_CREATED_SUCCESS,
}

export const GET_SPENDING_MONEY_MINE_SUCCESS = "GET_SPENDING_MONEY_MINE_SUCCESS";
export interface GetSpendingMoneyMineSuccess {
    type: typeof GET_SPENDING_MONEY_MINE_SUCCESS,
    data: ISpendingMoneyData[],
}

export const GET_SPENDING_MONEY_MINE_REQUEST = "GET_SPENDING_MONEY_MINE_REQUEST";
export interface GetSpendingMoneyMineRequest {
    type: typeof GET_SPENDING_MONEY_MINE_REQUEST,
    data: number,
}

export const GET_SPENDING_MONEY_MINE_FAIL = "GET_SPENDING_MONEY_MINE_FAIL";
export interface GetSpendingMoneyMineFail {
    type: typeof GET_SPENDING_MONEY_MINE_FAIL,
    data: ISpendingMineResponse,
}

export const DELETED_GROUP = "DELETED_GROUP";
export interface DeletedGroup {
    type: typeof DELETED_GROUP,
    data: boolean,
};

export type SpendingMineActions = LOGOUT | DeletedGroup |
    AddSpendingMoneySuccess | AddSpendingMoneyRequest | AddSpendingMoneyFail | ResetCreatedSuccess |
    GetSpendingMoneyMineRequest | GetSpendingMoneyMineSuccess | GetSpendingMoneyMineFail;
