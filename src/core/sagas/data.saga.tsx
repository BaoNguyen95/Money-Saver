import * as actions from "../../core/actionTypes";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getBill, getListUser, getSpendingType } from "@moneysaver/shared/services/common.service";
import { IUser } from "@moneysaver/shared/models/common.model";

function* GetSpendingType() {
    try {
        const result: Promise<any> = yield call(getSpendingType);
        yield put({ type: actions.GET_SPENDING_TYPE_SUCCESS, data: result });
    } catch (e: any) {
        yield put({ type: actions.GET_SPENDING_TYPE_FAIL, data: e.message });
    }
}

function* GetBill() {
    try {
        const result: Promise<any> = yield call(getBill);
        yield put({ type: actions.GET_BILL_SUCCESS, data: result });
    } catch (e: any) {
        yield put({ type: actions.GET_BILL_FAIL, data: e.message });
    }
}


function* GetListUser() {
    try {
        const result: Promise<IUser[]> = yield call(getListUser);
        yield put({ type: actions.GET_LIST_USER_SUCCESS, data: { listUser: result } });
    } catch (e: any) {
        yield put({ type: actions.GET_LIST_USER_FAIL, data: e.message });
    }
}

function* watchOnAppData() {
    yield takeEvery(actions.GET_SPENDING_TYPE_REQUEST, GetSpendingType);
    yield takeEvery(actions.GET_BILL_REQUEST, GetBill);
    yield takeEvery(actions.GET_LIST_USER_REQUEST, GetListUser);
}

function* AppDataSaga() {
    yield all([fork(watchOnAppData)]);
}

export default AppDataSaga;
