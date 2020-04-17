export function loading() {
  return {
    type: "@pictures/LOADING",
  };
}

export function loadPictures(pictures) {
  console.log("dispatch --- @pictures/LOAD_PICTURES ");
  return {
    type: "@pictures/LOAD_PICTURES",
    payload: { pictures },
  };
}

export function votePicture(vote) {
  console.log("dispatch --- @pictures/VOTE_PICTURES ");
  return {
    type: "@pictures/VOTE_PICTURES",
    payload: { vote },
  };
}

export default {
  loading,
  loadPictures,
};
