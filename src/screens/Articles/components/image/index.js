import React from "react";
import { Dimensions } from "react-native";
import { Image } from "react-native-expo-image-cache";

import { Container } from "./styles";

const { width } = Dimensions.get("window");

function Component({ source }) {
  return (
    <Container>
      <Image
        uri={source}
        style={{ width, height: 400 }}
        resizeMode="cover"
      ></Image>
    </Container>
  );
}

export default Component;
