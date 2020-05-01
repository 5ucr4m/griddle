import React from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { Container, Block, Icon } from "./styles";

function Header({}) {
  const navigation = useNavigation();

  return (
    <Container>
      <Block>
        <Icon onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="#FFF"></Feather>
        </Icon>
      </Block>
      <Block flex={2} center>
        <Text style={{ fontSize: 24, color: "#fff" }}>griddle</Text>
      </Block>
      <Block>
        <Icon right></Icon>
      </Block>
    </Container>
  );
}

export default Header;
