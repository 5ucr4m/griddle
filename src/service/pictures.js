import api from "./api";

async function getAll() {
  const url = `/pictures/app`;
  try {
    let x = 0;
    const response = await api.get(url);
    const resp = response.data.map((a, index) => ({
      title: a.name,
      image: a.path,
      uri: a.path,
      source: {
        uri: a.path,
      },
      cta: "",
      id: x++,
      picture_id: a.id,
      user_id: a.user_id,
      user: a.user,
      vote: a.vote,
      comment: a.comment,
      time: a.createdAt,
    }));
    return resp;
  } catch (err) {}
  return data;
}

async function getComments(id) {
  const url = `/pictures/${id}/comments`;
  try {
    const { data } = await api.get(url);

    return data;
  } catch (err) {}
  return data;
}

async function addComment(picture_id, description, user_id) {
  const url = `/comments`;
  const dados = { user_id, picture_id, description };

  try {
    const { data } = await api.post(url, dados);
    return data;
  } catch (err) {}
}

async function getVotes(id) {
  const url = `/pictures/${id}/votes`;
  try {
    const { data } = await api.get(url);
    return data;
  } catch (err) {}
  return data;
}

async function addVotes(picture_id, type_vote = "like", user_id) {
  const url = `/votes`;
  const dados = { user_id, picture_id, kind: "1", type_vote };
  try {
    const resp = await api.post(url, dados);
    return resp.data;
  } catch (err) {}
  // return data;
}

export default {
  getAll,
  getComments,
  addComment,
  getVotes,
  addVotes,
};
