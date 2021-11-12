import * as actions from "../../core/actionTypes";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { createUser } from "../../shared/services/registration.service";

function* addUser(action: actions.AddUserRequest) {
    try {
        const result: Promise<any> = yield call(createUser, action.data);
        yield put({ type: actions.ADD_USER_SUCCESS, data: result });
    } catch (e: any) {
        yield put({ type: actions.ADD_USER_FAIL });
    }
}

function* watchOnGetData() {
    yield takeEvery(actions.ADD_USER_REQUEST, addUser);
}

function* RegistrationSaga() {
    yield all([fork(watchOnGetData)]);
}

export default RegistrationSaga;
