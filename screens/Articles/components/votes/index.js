import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "react-native";
import { Button } from "galio-framework";
import * as SQLite from "expo-sqlite";

import pictures from "../../../../service/pictures";
import pictureActions from "../../../../store/modules/pictures/actions";

import { Container, Title, Count } from "./styles";

const db = SQLite.openDatabase("griddledb.db");

let user_id = null;

db.transaction(tx => {
  tx.executeSql("SELECT * FROM user;", [], (tx, results) => {
    for (let i = 0; i < results.rows.length; ++i) {
      user_id = JSON.parse(results.rows.item(i).user).id;
      return true;
    }
  });
});

export default function Votes({ id }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [votes, setVotes] = useState([]);

  async function loadVotes() {
    setLoading(true);
    const data = await pictures.getVotes(id);
    setVotes(data);
    setLoading(false);
  }

  async function handleVote() {
    if (!loading) {
      setLoading(true);
      const isVoted = votes.docs.find(item => item.user_id === user_id);
      !isVoted
        ? await pictures.addVotes(id)
        : Alert.alert("You have already voted!!");
      await loadVotes();
    }
    setLoading(false);
    dispatch(pictureActions.loading());
  }

  useEffect(() => {
    loadVotes();
  }, []);

  return (
    <Container>
      <Title>Votes</Title>
      <Count>You have {votes.total} votes</Count>
      <Button onPress={() => handleVote()} loading={loading} disabled={loading}>
        Vote
      </Button>
    </Container>
  );
}
