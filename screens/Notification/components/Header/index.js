import React from "react";
import { Image } from "react-native";
import {
  withNavigation,
  StackActions,
  NavigationActions
} from "react-navigation";
import { Feather } from "@expo/vector-icons";

import { Container, Block, Icon } from "./styles";
import Logo from "../../../../assets/Logo.png";

function Header({ navigation }) {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "PostImage" })]
  });

  return (
    <Container>
      <Block>
        <Icon onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={20} color="#FFF"></Feather>
        </Icon>
      </Block>
      <Block flex={2} center>
        <Image source={Logo}></Image>
      </Block>
      <Block>
        {/* <Icon right>
          <Feather name="camera" size={20} color="#FFF"></Feather>
        </Icon> */}
        <Icon right>
          <Feather name="send" size={20} color="#FFF"></Feather>
        </Icon>
      </Block>
    </Container>
  );
}

export default withNavigation(Header);
