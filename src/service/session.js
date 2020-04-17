import api from "./api";

async function login(email, password) {
  try {
    const response = await api.post("/users/signin", { email, password });
    return { status: "success", data: response.data };
  } catch (error) {
    return { status: "fail", error: error.response };
  }
}

export default {
  login
};
