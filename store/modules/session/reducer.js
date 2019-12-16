import { produce } from "immer";

const INITIAL_STATE = {
  user_id: null,
  token: null,
  username: null,
  fistTime: true
};

export default function session(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "@session/ADD": {
      return produce(state, draft => {
        draft.token = action.payload.token;
        draft.user_id = action.payload.user_id;
        draft.username = action.payload.username;
      });
    }

    case "@session/FIRSTTIME": {
      return produce(state, draft => {
        draft.fistTime = false;
      });
    }

    default:
      return state;
  }
}
