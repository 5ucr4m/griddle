import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Container, Item, Image, Name } from "./styles";
import api from "../../../../service/api";
import NoPhoto from "../../../../../assets/imgs/no-photo.png";

function LastPost() {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadLastUsers() {
      const { data: lastUsers } = await api.get("/users/last_post");
      setUsers(lastUsers);
    }
    loadLastUsers();
  }, []);

  return (
    <Container>
      <FlatList
        horizontal
        keyExtractor={(item) => item.id.toString()}
        data={users}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: { profile, ...data } }) => {
          return (
            <Item
              onPress={() =>
                navigation.navigate("GuestProfile", {
                  refUser: { data, profile },
                })
              }
            >
              <Image
                source={!!data.picture ? { uri: data.picture } : NoPhoto}
              />
              <Name>@{data.username}</Name>
            </Item>
          );
        }}
      />
    </Container>
  );
}

export default LastPost;
