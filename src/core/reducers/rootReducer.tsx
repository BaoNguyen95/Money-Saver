import SpendingMineReducer from "@moneysaver/screens/home/spending/mine/spending.mine.reducer";
import { combineReducers } from "redux";
import { LoginReducer, RolesReducer, UserReducer } from "../../screens/login/login.reducer";
import RegistrationReducer from "../../screens/registration/registration.reducer";
import { ToastReducer } from "../../shared/components/my.toast";
import AppDataReducer from "./data.reducer";

const rootReducer = combineReducers({
  registration: RegistrationReducer,
  login: LoginReducer,
  roles: RolesReducer,
  toast: ToastReducer,
  user: UserReducer,
  spendingMine: SpendingMineReducer,
  appData: AppDataReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
