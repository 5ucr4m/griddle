import React from "react";
import { TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Feather } from "@expo/vector-icons";

import { Container, Text } from "./styles";

function Header({ children, navigation }) {
  return (
    <Container>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home", { refresh: true })}
      >
        <Feather name="chevron-left" size={20} color="#999"></Feather>
      </TouchableOpacity>
      <Text numberOfLines={1}>{children}</Text>
    </Container>
  );
}

Header.defaultPros = {
  children: "Header"
};

export default withNavigation(Header);
