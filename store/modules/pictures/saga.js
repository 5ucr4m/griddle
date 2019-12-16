import { call, put } from "redux-saga/effects";

import picturesService from "../../../service/pictures";
import picturesActions from "../pictures/actions";

export function* loadPictures() {
  const resp = yield call(picturesService.getAll);
  yield put(picturesActions.loadPictures(resp));
}
