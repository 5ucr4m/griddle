export function addNoty(noty) {
  return {
    type: "@notify/ADD_NOTY",
    payload: { noty }
  };
}

export function readNoty() {
  return {
    type: "@notify/READ"
  };
}
