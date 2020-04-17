import api from "./api";

async function updateAvatar(file, id) {
  const formData = new FormData();

  formData.append("image", {
    uri: file.uri,
    type: file.type,
    name: `profile-${id}`
  });

  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    const response = await api.put(`/profiles/${id}`, formData, config);
    return { status: "success", data: response.data };
  } catch (error) {
    return { status: "fail", error: error.response };
  }
}

export default {
  updateAvatar
};
