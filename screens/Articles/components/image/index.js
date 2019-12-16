import React from "react";

import { Container, Image } from "./styles";

function Component({ source }) {
  return (
    <Container>
      <Image source={{ uri: source }} resizeMode="cover"></Image>
    </Container>
  );
}

export default Component;
