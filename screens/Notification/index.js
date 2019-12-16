import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import NotificationService from "../../service/notification";

import { FlatList } from "react-native";
import Header from "./components/Header";
import { Container, Item, Text, Avatar, Block } from "./styles";

import { readNoty } from "../../store/modules/notify/actions";

export default function Notification() {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);
  const unread = useSelector(state => state.notifies.unreadNotifications);
  const user_id = useSelector(state => state.session.user_id);

  useEffect(() => {
    setLoading(true);
    handleNotifications();
  }, []);

  useEffect(() => {
    setLoading(true);
    handleNotifications();
  }, [unread]);

  async function handleNotifications() {
    const response = await NotificationService.getAll(user_id);
    response.status === "success" && setNotification(response.data);
    setLoading(false);
    dispatch(readNoty());
  }

  return (
    <Container>
      <Header />
      {loading ? (
        <Block>
          <ActivityIndicator />
        </Block>
      ) : (
        <FlatList
          data={notification}
          renderItem={({ item }) => (
            <Item>
              <Avatar
                source={{
                  uri:
                    item.user.profile.picture ||
                    "http://www.redeorientefm.com.br/site/assets/imagens/user.png"
                }}
              />
              <Text>{item.message}</Text>
            </Item>
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </Container>
  );
}
