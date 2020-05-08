export function loading() {
  return {
    type: "@pictures/LOADING",
  };
}

export function loadPictures(pictures) {
  return {
    type: "@pictures/LOAD_PICTURES",
    payload: { pictures },
  };
}

export function votePicture(vote) {
  return {
    type: "@pictures/VOTE_PICTURES",
    payload: { vote },
  };
}

export default {
  loading,
  loadPictures,
};
