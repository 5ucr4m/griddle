import { combineReducers } from "redux";

import notifyReducer from "./notify/reducer";
import picturesReducer from "./pictures/reducer";
import sessionReducer from "./session/reducer";
import userReducer from "./user/reducer";

export default combineReducers({
  user: userReducer,
  session: sessionReducer,
  notifies: notifyReducer,
  pictures: picturesReducer
});
