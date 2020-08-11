export function addSession(user_id, token, username, user) {
  console.log("addSession", { user_id, token, username, user });
  return {
    type: "@session/ADD",
    payload: { user_id, token, username, user },
  };
}

export function removeFirstTime() {
  return {
    type: "@session/FIRSTTIME",
  };
}

export function logout() {
  return {
    type: "@session/LOGOUT",
  };
}
