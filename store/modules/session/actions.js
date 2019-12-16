export function addSession(user_id, token, username) {
  return {
    type: "@session/ADD",
    payload: { user_id, token, username }
  };
}

export function removeFirstTime() {
  return {
    type: "@session/FIRSTTIME"
  };
}
