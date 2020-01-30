import React, { useEffect, useState, useCallback } from "react";
import { Feather } from "@expo/vector-icons";
import { Container, ContainerInput, TextInput } from "./styles";
import api from "../../../../service/api";

export default function Search() {
  const [search, setSearch] = useState("");

  const users = useCallback(async () => {
    return data;
  }, [search]);

  useEffect(() => {
    if (search.length < 1) return;
    async function loadUsers(text) {
      const { data } = await api.get(`/users/find/${text}`);
      console.log(data);
    }
    loadUsers(search);
    console.log(search);
  }, [search]);

  useEffect(() => {
    console.log("mudou");
    console.log(search);
  });

  return (
    <Container>
      <ContainerInput>
        <TextInput
          placeholder="Search User"
          onChangeText={text => {
            setSearch(text);
          }}
        />
        <Feather name="search" size={18} color="#ACACAC" />
      </ContainerInput>
    </Container>
  );
}
