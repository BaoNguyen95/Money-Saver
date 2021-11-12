import * as actions from "../actionTypes";
import { IGetAppDataResponse } from "../reducers/data.reducer";

export const getSpendingTypeRequest = (): actions.GetSpendingTypeRequest => {
    return {
        type: actions.GET_SPENDING_TYPE_REQUEST,
    };
};

export const getSpendingTypeSuccess = (
    data: IGetAppDataResponse
): actions.GetSpendingTypeSuccess => {
    return {
        type: actions.GET_SPENDING_TYPE_SUCCESS,
        data,
    };
};

export const getSpendingTypeFail = (data: IGetAppDataResponse): actions.GetSpendingTypeFail => {
    return {
        type: actions.GET_SPENDING_TYPE_FAIL,
        data,
    };
};

export const getBillRequest = (): actions.GetBillRequest => {
    return {
        type: actions.GET_BILL_REQUEST,
    };
};

export const getBillSuccess = (
    data: IGetAppDataResponse
): actions.GetBillSuccess => {
    return {
        type: actions.GET_BILL_SUCCESS,
        data,
    };
};

export const getBillFail = (data: IGetAppDataResponse): actions.GetBillFail => {
    return {
        type: actions.GET_BILL_FAIL,
        data,
    };
};

export const getListUserRequest = (): actions.GetListUserRequest => {
    return {
        type: actions.GET_LIST_USER_REQUEST,
    };
};

export const getListUserSuccess = (
    data: IGetAppDataResponse
): actions.GetListUserSuccess => {
    return {
        type: actions.GET_LIST_USER_SUCCESS,
        data,
    };
};

export const getListUserFail = (data: IGetAppDataResponse): actions.GetListUserFail => {
    return {
        type: actions.GET_LIST_USER_FAIL,
        data,
    };
};