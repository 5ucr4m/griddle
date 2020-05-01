import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Image, StatusBar, Text, View } from "react-native";

import { Container, Block, Icon } from "./styles";
import IconIcon from "../../../../../assets/icons/smiley_face64.png";
import NotyIcon from "../../../../../assets/icons/heart_notification64.png";

function Header({ scrollOffset }) {
  const notyCount = useSelector((state) => state.notifies.data.length);
  const unread = useSelector((state) => state.notifies.unreadNotifications);
  const navigation = useNavigation();
  return (
    <Container>
      <StatusBar backgroundColor="#332286" barStyle="light-content" />
      <Block>
        <Icon>
          <Image source={IconIcon} style={{ width: 32, height: 32 }} />
        </Icon>
      </Block>
      <Block flex={2} center>
        <Text style={{ fontSize: 24, color: "#fff" }}>griddle</Text>
      </Block>
      <Block>
        <Icon right onPress={() => navigation.navigate("Notification")}>
          <Image source={NotyIcon} style={{ width: 32, height: 32 }} />
          {!!notyCount && unread && (
            <View
              style={{
                fontSize: 9,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                width: 31,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                {notyCount}
              </Text>
            </View>
          )}
        </Icon>
      </Block>
    </Container>
  );
}

export default Header;
