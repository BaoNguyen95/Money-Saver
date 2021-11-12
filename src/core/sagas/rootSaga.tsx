import SpendingMineSaga from "@moneysaver/screens/home/spending/mine/spending.mine.saga";
import { all, fork } from "redux-saga/effects";
import LoginSaga from "../../screens/login/login.saga";
import RegistrationSaga from "../../screens/registration/registration.saga";
import AppDataSaga from "./data.saga";

function* rootSaga() {
  yield all([fork(RegistrationSaga)]);
  yield all([fork(LoginSaga)]);
  yield all([fork(SpendingMineSaga)]);
  yield all([fork(AppDataSaga)]);
}

export default rootSaga;
