import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { withNavigation } from "react-navigation";
import { Container, Item, Image, Name } from "./styles";
import api from "../../../../service/api";
import NoPhoto from "../../../../assets/imgs/no-photo.png";

function LastPost({ navigation }) {
  const [users, setUsers] = useState([]);

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
        data={users}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: { profile, ...data } }) => {
          return (
            <Item
              onPress={() =>
                navigation.navigate("GuestProfile", {
                  refUser: { data, profile }
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

export default withNavigation(LastPost);
