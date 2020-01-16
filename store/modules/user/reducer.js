import { produce } from "immer";

const INITIAL_STATE = {
  data: {},
  profile: {}
};

export default function session(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "@session/ADD": {
      const { profile, ...data } = action.payload.user;
      return produce(state, draft => {
        draft.data = data;
        draft.profile = profile;
      });
    }

    case "@user/UPDATE_PROFILE": {
      return produce(state, draft => {
        draft.profile = action.payload.profile;
      });
    }

    default:
      return state;
  }
}
