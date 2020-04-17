import api from "./api";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("griddledb.db");

let user_id = null;

db.transaction((tx) => {
  tx.executeSql("SELECT * FROM user;", [], (tx, results) => {
    for (let i = 0; i < results.rows.length; ++i) {
      user_id = JSON.parse(results.rows.item(i).user).id;
      return true;
    }
  });
});

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
  } catch (err) {
    console.log("getPicturesError: ", err.response);
  }
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

async function addComment(picture_id, description) {
  const url = `/comments`;
  const dados = { user_id, picture_id, description };

  try {
    const { data } = await api.post(url, dados);
    return data;
  } catch (err) {
    // console.log("addCommentError: ", err.response);
  }
}

async function getVotes(id) {
  const url = `/pictures/${id}/votes`;
  try {
    const { data } = await api.get(url);
    return data;
  } catch (err) {
    // console.log("getVotesError: ", err.response);
  }
  return data;
}

async function addVotes(picture_id, type_vote = "like") {
  const url = `/votes`;
  const dados = { user_id, picture_id, kind: "1", type_vote };
  try {
    const resp = await api.post(url, dados);
    return resp.data;
  } catch (err) {}
  return data;
}

export default {
  getAll,
  getComments,
  addComment,
  getVotes,
  addVotes,
};
