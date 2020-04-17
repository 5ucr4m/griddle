import { all, takeLatest } from "redux-saga/effects";

import { loadNotifications } from "./notify/saga";

export default function* rootSaga() {
  return yield all([takeLatest("@notify/ADD_NOTY", loadNotifications)]);
}
