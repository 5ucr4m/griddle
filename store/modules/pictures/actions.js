export function loading() {
  return {
    type: "@pictures/LOADING"
  };
}

export function loadPictures(pictures) {
  console.log("dispatch --- @pictures/LOAD_PICTURES ");
  return {
    type: "@pictures/LOAD_PICTURES",
    payload: { pictures }
  };
}

export default {
  loading,
  loadPictures
};
