import { IGetAppDataResponse } from '../reducers/data.reducer';

export const GET_SPENDING_TYPE_SUCCESS = "GET_SPENDING_TYPE_SUCCESS";

// Get Spending Type
export interface GetSpendingTypeSuccess {
    type: typeof GET_SPENDING_TYPE_SUCCESS,
    data: IGetAppDataResponse,
}

export const GET_SPENDING_TYPE_REQUEST = "GET_SPENDING_TYPE_REQUEST";
export interface GetSpendingTypeRequest {
    type: typeof GET_SPENDING_TYPE_REQUEST,
}

export const GET_SPENDING_TYPE_FAIL = "GET_SPENDING_TYPE_FAIL";
export interface GetSpendingTypeFail {
    type: typeof GET_SPENDING_TYPE_FAIL,
    data: IGetAppDataResponse
}

// Get Bill

export const GET_BILL_SUCCESS = "GET_BILL_SUCCESS";
export interface GetBillSuccess {
    type: typeof GET_BILL_SUCCESS,
    data: IGetAppDataResponse,
}

export const GET_BILL_REQUEST = "GET_BILL_REQUEST";
export interface GetBillRequest {
    type: typeof GET_BILL_REQUEST,
}

export const GET_BILL_FAIL = "GET_BILL_FAIL";
export interface GetBillFail {
    type: typeof GET_BILL_FAIL,
    data: IGetAppDataResponse
}

// Get List User

export const GET_LIST_USER_SUCCESS = "GET_LIST_USER_SUCCESS";
export interface GetListUserSuccess {
    type: typeof GET_LIST_USER_SUCCESS,
    data: IGetAppDataResponse,
}

export const GET_LIST_USER_REQUEST = "GET_LIST_USER_REQUEST";
export interface GetListUserRequest {
    type: typeof GET_LIST_USER_REQUEST,
}

export const GET_LIST_USER_FAIL = "GET_LIST_USER_FAIL";
export interface GetListUserFail {
    type: typeof GET_LIST_USER_FAIL,
    data: IGetAppDataResponse
}

export type AppDataAction =
    GetListUserSuccess | GetListUserRequest | GetListUserFail |
    GetSpendingTypeFail | GetSpendingTypeRequest | GetSpendingTypeSuccess |
    GetBillFail | GetBillRequest | GetBillSuccess;