import React from "react";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import {
  useNavigation,
  StackActions,
  NavigationActions,
} from "react-navigation";
import HomeIcon from "../../../../assets/icons/home.png";
import EmailIcon from "../../../../assets/icons/email.png";
import CamIcon from "../../../../assets/icons/cam.png";
import QuestionIcon from "../../../../assets/icons/question.png";
import UserIcon from "../../../../assets/icons/user.png";

import { Container, Icon, Noty } from "./styles";

function Footer() {
  const navigation = useNavigation();
  const unreadNoty = useSelector((state) => state.notifies.unreadNotifications);

  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "PostImage" })],
  });

  return (
    <Container>
      <Icon onPress={() => navigation.navigate("Home")}>
        <Image source={HomeIcon} style={{ width: 24, height: 24 }} />
      </Icon>
      <Icon>
        <Image source={EmailIcon} style={{ width: 24, height: 24 }} />
      </Icon>
      <Icon onPress={() => navigation.dispatch(resetAction)}>
        <Image source={CamIcon} style={{ width: 24, height: 24 }} />
      </Icon>
      <Icon onPress={() => navigation.navigate("Notification")}>
        {unreadNoty && <Noty />}
        <Image source={QuestionIcon} style={{ width: 24, height: 24 }} />
      </Icon>
      <Icon onPress={() => navigation.navigate("Profile")}>
        <Image source={UserIcon} style={{ width: 24, height: 24 }} />
      </Icon>
    </Container>
  );
}

export default Footer;
