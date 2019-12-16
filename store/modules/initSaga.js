import { call, put } from "redux-saga/effects";

import picturesActions from "./pictures/actions";

export function* init() {
  yield put(picturesActions.loading());
}
