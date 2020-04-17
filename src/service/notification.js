import api from "./api";

async function getAll(user_id) {
  const url = `/users/${user_id}/notifications`;
  try {
    const response = await api.get(url);
    return { status: "success", data: response.data };
  } catch (err) {
    console.log("getNotificationError: ", err.response);
  }
  return data;
}

export default {
  getAll
};
