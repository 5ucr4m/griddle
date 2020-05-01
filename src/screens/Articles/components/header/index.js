import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { Container, Text } from "./styles";

function Header({ children }) {
  const navigation = useNavigation();
  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={24} color="#999" />
      </TouchableOpacity>
      <Text numberOfLines={1}>{children}</Text>
    </Container>
  );
}

Header.defaultPros = {
  children: "Header",
};

export default Header;
