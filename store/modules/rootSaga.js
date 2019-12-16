import { all, takeLatest } from "redux-saga/effects";

import { loadPictures } from "./pictures/saga";
import { loadNotifications } from "./notify/saga";

export default function* rootSaga() {
  return yield all([
    takeLatest("@pictures/LOADING", loadPictures),
    takeLatest("@notify/ADD_NOTY", loadNotifications)
  ]);
}
