import { produce } from "immer";

const INITIAL_STATE = {
  data: [],
  unreadNotifications: false
};

export default function notify(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "@notify/ADD_NOTY": {
      return produce(state, draft => {
        draft.data = [...state.data, action.payload.noty];
        draft.unreadNotifications = true;
      });
    }

    case "@notify/READ": {
      return produce(state, draft => {
        draft.unreadNotifications = false;
      });
    }

    default:
      return state;
  }
}
