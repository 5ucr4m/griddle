import { persistStore, persistReducer } from "redux-persist";
import createSecureStore from "redux-persist-expo-securestore";

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";

const storage = createSecureStore();

const persistConfig = {
  key: "griddle",
  storage,
  whitelist: ["session", "user"],
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
export default store;
