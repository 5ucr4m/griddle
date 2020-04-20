import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  Container,
  ContainerInput,
  TextInput,
  SearchResult,
  Text,
  TextNoResult,
} from "./styles";
import api from "../../../../service/api";

export default function Search() {
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [resultUsers, setResultUsers] = useState([]);

  useEffect(() => {
    if (search.length < 1) {
      setVisible(false);
      return;
    }

    setVisible(true);
    async function loadUsers(text) {
      const { data } = await api.get(`/users/find/${text}`);
      setResultUsers(data);
    }
    loadUsers(search);
  }, [search]);

  useEffect(() => {
    console.log("mudou");
    console.log(search);
  });

  return (
    <Container>
      <ContainerInput>
        <TextInput
          placeholder="Search"
          onChangeText={(text) => {
            setSearch(text);
          }}
        />
        <Feather name="search" size={18} color="#ACACAC" />
      </ContainerInput>
      <SearchResult visible={visible}>
        {resultUsers.map((user) => (
          <Text>@{user.username}</Text>
        ))}
        {resultUsers.length === 0 && (
          <TextNoResult>--- No results ---</TextNoResult>
        )}
      </SearchResult>
    </Container>
  );
}
