import { call, put } from "redux-saga/effects";

import picturesService from "../../../service/pictures";
import picturesActions from "../pictures/actions";

export function* loadPictures() {
  try {
    const resp = yield call(picturesService.getAll);
    console.log(resp);
    yield put(picturesActions.loadPictures(resp));
  } catch (err) {
    console.log(err);
  } finally {
    yield put({
      type: "@pictures/STOP_LOADING",
    });
  }
}
