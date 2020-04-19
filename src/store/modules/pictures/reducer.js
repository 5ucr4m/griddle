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
    case "@pictures/LOAD_PICTURES": {
      const resp = action.payload.pictures.reduce((photo, item) =>
        photo.picture_id > item.picture_id ? photo : item
      );

      return produce(state, (draft) => {
        draft.data = action.payload.pictures;
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