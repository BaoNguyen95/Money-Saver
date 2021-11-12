import * as actions from "@moneysaver/core/actionTypes";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { handleError } from "@moneysaver/shared/services/app.service";
import { addNewSpending } from "@moneysaver/shared/services/spending.service";

function* addNew(action: actions.AddSpendingMoneyRequest) {
    try {
        const result: Promise<any> = yield call(addNewSpending, action.data);
        yield put({ type: actions.ADD_SPENDING_MONEY_SUCCESS, data: result });
    } catch (e: any) {
        handleError(e);
        yield put({ type: actions.ADD_SPENDING_MONEY_FAIL, data: e.message });
    }
}

function* getSpendingMoney(action: actions.GetSpendingMoneyMineRequest) {
    try {
        // const result: Promise<any> = yield call(getSpendingMoneyMine, action.data);
        // yield put({ type: actions.ADD_SPENDING_MONEY_SUCCESS, data: result });
    } catch (e: any) {
        handleError(e);
        yield put({ type: actions.ADD_SPENDING_MONEY_FAIL, data: e.message });
    }
}

function* watchOnAddNewSpendingMoney() {
    yield takeEvery(actions.ADD_SPENDING_MONEY_REQUEST, addNew);
    yield takeEvery(actions.GET_SPENDING_MONEY_MINE_REQUEST, getSpendingMoney);
}

function* SpendingMineSaga() {
    yield all([fork(watchOnAddNewSpendingMoney)]);
}


export default SpendingMineSaga;
