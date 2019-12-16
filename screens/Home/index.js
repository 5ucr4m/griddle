import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import api from "../../service/api";

import { Container, Content } from "./styles";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Galery from "./components/Galery";
import FloatImage from "./components/FloatImage";

import { loading as _loading } from "../../store/modules/pictures/actions";
import { addNoty } from "../../store/modules/notify/actions";

console.disableYellowBox = true;

export default function Home() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const images = useSelector(state => state.pictures.data);
  const load = useSelector(state => state.pictures.loading);
  const session = useSelector(state => state.session);

  useEffect(() => {
    registerForPushNotifications();
    dispatch(_loading());
  }, []);

  registerForPushNotifications = async () => {
    try {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        return;
      }

      let token = await Notifications.getExpoPushTokenAsync();

      try {
        await api.post("/users/notification_token", {
          user_id: session.user_id,
          token_notification: token
        });
      } catch (e) {
        console.log(e);
      }

      Notifications.addListener(_handleNotification);
    } catch (e) {
      console.log(e);
    }
  };

  _handleNotification = notification => {
    dispatch(addNoty(notification));
  };

  return (
    <>
      <Container>
        <Header />
        <Content>
          {!!load ? (
            <ActivityIndicator color="#000" />
          ) : (
            <>
              <Galery images={images}></Galery>
              {session.fistTime && (
                <FloatImage
                  image={images[0]}
                  visible={visible}
                  setVisible={setVisible}
                />
              )}
            </>
          )}
        </Content>
        <Footer></Footer>
      </Container>
    </>
  );
}
