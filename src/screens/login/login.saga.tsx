import * as actions from "../../core/actionTypes";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { login } from "../../shared/services/login.service";
import { handleError } from "../../shared/services/app.service";
import { getRoles, getUser } from "@moneysaver/shared/services/user.service";

function* Login(action: actions.LoginRequest) {
    try {
        const result: Promise<any> = yield call(login, action.data);
        yield put({ type: actions.LOGIN_SUCCESS, data: result });
    } catch (e: any) {
        yield put({ type: actions.LOGIN_FAIL, data: e.message });
    }
}

function* GetRoles() {
    try {
        const result: Promise<any> = yield call(getRoles);
        yield put({ type: actions.GET_ROLES_SUCCESS, data: result });
    } catch (e: any) {
        yield put({ type: actions.GET_ROLES_FAIL });
    }
}

function* GetUser(action: actions.GetUserRequest) {
    try {
        const result: Promise<any> = yield call(getUser, action.data);
        yield put({ type: actions.GET_USER_SUCCESS, data: result });
    } catch (e: any) {
        handleError({ message: e.message });
        yield put({ type: actions.GET_USER_FAIL, data: e.message });
    }
}

function* watchOnLogin() {
    yield takeEvery(actions.LOGIN_REQUEST, Login);
}

function* watchOnGetRoles() {
    yield takeEvery(actions.GET_ROLES_REQUEST, GetRoles);
}

function* watchOnGetGetUser() {
    yield takeEvery(actions.GET_USER_REQUEST, GetUser);
}

function* LoginSaga() {
    yield all([fork(watchOnLogin)]);
    yield all([fork(watchOnGetRoles)]);
    yield all([fork(watchOnGetGetUser)]);
}

export default LoginSaga;
