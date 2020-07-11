import { produce } from "immer";

const INITIAL_STATE = {
  loading: false,
  data: [],
  lastPick: null,
};

export default function notify(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "@pictures/LOADING": {
      return produce(state, (draft) => {
        draft.loading = true;
      });
    }

    case "@pictures/STOP_LOADING": {
      return produce(state, (draft) => {
        draft.loading = false;
      });
    }

    case "@pictures/LOAD_PICTURES": {
      const arr = action.payload.pictures;
      const resp = !!arr.length
        ? arr.reduce((photo, item) =>
            photo.picture_id > item.picture_id ? photo : item
          )
        : null;

      return produce(state, (draft) => {
        draft.data = arr;
        draft.lastPick = resp;
        draft.loading = false;
      });
    }

    case "@pictures/VOTE_PICTURES": {
      const { vote } = action.payload;
      const newData = state.data.map((item) =>
        item.picture_id === vote.picture_id
          ? { ...item, vote: [...item.vote, vote] }
          : item
      );

      return produce(state, (draft) => {
        draft.data = newData;
      });
    }

    default:
      return state;
  }
}
