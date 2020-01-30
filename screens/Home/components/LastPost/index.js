import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { Container, Item, Image, Name } from "./styles";
import api from "../../../../service/api";

function Random() {
  return Math.round(Math.random() * 100);
}

const personas = [
  {
    uri: `https://randomuser.me/api/portraits/men/${Random()}.jpg`,
    username: "@Rene"
  },
  {
    uri: `https://randomuser.me/api/portraits/women/${Random()}.jpg`,
    username: "@Rene"
  },
  {
    uri: `https://randomuser.me/api/portraits/women/${Random()}.jpg`,
    username: "@Rene"
  },
  {
    uri: `https://randomuser.me/api/portraits/men/${Random()}.jpg`,
    username: "@Rene"
  },
  {
    uri: `https://randomuser.me/api/portraits/women/${Random()}.jpg`,
    username: "@Rene"
  },
  {
    uri: `https://randomuser.me/api/portraits/women/${Random()}.jpg`,
    username: "@Rene"
  }
];

export default function LastPost() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadLastUsers() {
      const { data: lastUsers } = await api.get("/users/last_post");
      console.log(lastUsers);
      setUsers(lastUsers);
    }
    loadLastUsers();
  }, []);

  return (
    <Container>
      <FlatList
        horizontal
        data={users}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <Item>
              <Image source={{ uri: item.picture }} />
              <Name>@{item.username}</Name>
            </Item>
          );
        }}
      />
    </Container>
  );
}
