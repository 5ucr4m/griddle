export function updateProfile(profile) {
  return {
    type: "@user/UPDATE_PROFILE",
    payload: { profile }
  };
}
