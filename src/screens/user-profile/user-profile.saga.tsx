import * as actions from "../../core/actionTypes";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { login } from "../../shared/services/login.service";

function* Login(action: actions.LoginRequest) {
    try {
        const result: Promise<any> = yield call(login, action.data);
        yield put({ type: actions.LOGIN_SUCCESS, data: result });
    } catch (e: any) {
        yield put({ type: actions.LOGIN_FAIL });
    }
}

function* watchOnGetData() {
    yield takeEvery(actions.LOGIN_REQUEST, Login);
}

function* LoginSaga() {
    yield all([fork(watchOnGetData)]);
}

export default LoginSaga;
