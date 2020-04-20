import { all, takeLatest } from "redux-saga/effects";

import { loadNotifications } from "./notify/saga";
import { loadPictures } from "./pictures/saga";

export default function* rootSaga() {
  return yield all([
    takeLatest("@pictures/LOADING", loadPictures),
    takeLatest("@notify/ADD_NOTY", loadNotifications),
  ]);
}
