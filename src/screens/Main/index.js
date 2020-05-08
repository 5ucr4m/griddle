import React, { useState, useEffect } from "react";
import {
  Animated,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import api from "../../service/api";

import { Container, Content, Wrapper } from "./styles";
import Header from "./components/Header";
import Search from "./components/Search";
import LastPost from "./components/LastPost";
import FloatFooter from "./components/FloatFooter";
import Galery from "./components/Mansory";
import FloatImage from "./components/FloatImage";

import { loading as _loading } from "../../store/modules/pictures/actions";
import { addNoty } from "../../store/modules/notify/actions";

console.disableYellowBox = true;
const { height } = Dimensions.get("window");

function Home() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const images = useSelector((state) => state.pictures.data);
  const imagesBox = useSelector((state) => state.pictures.lastPick);
  const load = useSelector((state) => state.pictures.loading);
  const session = useSelector((state) => state.session);
  const [scrollOffset] = useState(new Animated.Value(0));

  useEffect(() => {
    dispatch(_loading());
    registerForPushNotifications();
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
          token_notification: token,
        });
      } catch (e) {}

      Notifications.addListener(_handleNotification);
    } catch (e) {}
  };

  _handleNotification = (notification) => {
    dispatch(addNoty(notification));
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Wrapper>
        <Animated.View
          style={{
            width: "100%",
            height: scrollOffset.interpolate({
              inputRange: [0, 240],
              outputRange: [height * 0.07 + 152, 0],
              extrapolate: "clamp",
            }),
            top: scrollOffset.interpolate({
              inputRange: [0, 240],
              outputRange: [0, (height * 0.07 + 152) * -1],
              extrapolate: "clamp",
            }),
            opacity: scrollOffset.interpolate({
              inputRange: [0, 240],
              outputRange: [1, 0.6],
              extrapolate: "clamp",
            }),
          }}
        >
          <Header />
          <Search />
          <LastPost />
        </Animated.View>
        <Content>
          {!!load ? (
            <ActivityIndicator color="#000" />
          ) : (
            <>
              <Galery images={images} scrollOffset={scrollOffset}></Galery>
              {session.fistTime && (
                <FloatImage
                  image={imagesBox}
                  visible={visible}
                  setVisible={setVisible}
                />
              )}
            </>
          )}
        </Content>
        <FloatFooter />
      </Wrapper>
    </Container>
  );
}

export default Home;
