import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers/rootReducer";
import rootSaga from "../sagas/rootSaga";
const sagaMiddleware = createSagaMiddleware();

export const AppStore = createStore(rootReducer, applyMiddleware(sagaMiddleware));

const configureStore = () => {
  sagaMiddleware.run(rootSaga);
  return AppStore;
};

export default configureStore;
