import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
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
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Search() {
  const navigation = useNavigation();
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
        {resultUsers.map((user) => {
          const { profile, ...data } = user;
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("GuestProfile", {
                  refUser: { data, profile },
                })
              }
            >
              <Text>@{user.username}</Text>
            </TouchableOpacity>
          );
        })}
        {resultUsers.length === 0 && (
          <TextNoResult>--- No results ---</TextNoResult>
        )}
      </SearchResult>
    </Container>
  );
}
