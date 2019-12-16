import { combineReducers } from "redux";

import notifyReducer from "./notify/reducer";
import picturesReducer from "./pictures/reducer";
import sessionReducer from "./session/reducer";

export default combineReducers({
  session: sessionReducer,
  notifies: notifyReducer,
  pictures: picturesReducer
});
