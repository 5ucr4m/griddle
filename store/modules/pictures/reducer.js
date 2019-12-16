import { produce } from "immer";

const INITIAL_STATE = {
  loading: false,
  data: []
};

export default function notify(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "@pictures/LOADING": {
      return produce(state, draft => {
        draft.loading = true;
      });
    }
    case "@pictures/LOAD_PICTURES": {
      return produce(state, draft => {
        draft.data = action.payload.pictures;
        draft.loading = false;
      });
    }

    default:
      return state;
  }
}
