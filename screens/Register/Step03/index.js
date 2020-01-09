import React, { useState } from "react";
import { Text } from "galio-framework";

import {
  Container,
  TextMessageContainer,
  Label,
  InputContainer,
  InputMessage
} from "./styles";
import { Block } from "../styles";

import { argonTheme } from "../../../constants";
import { Button, Icon, Input } from "../../../components";

export default function Step02({ next }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  return (
    <Container>
      <TextMessageContainer>
        <Label>
          To verify your number, a 4 digits code was send to you by a text
          message.
        </Label>
        <InputContainer>
          <InputMessage></InputMessage>
          <InputMessage></InputMessage>
          <InputMessage></InputMessage>
          <InputMessage></InputMessage>
        </InputContainer>
      </TextMessageContainer>

      <Block>
        <Button
          color="primary"
          onPress={() => next()}
          style={{ width: "100%" }}
        >
          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
            NEXT STEP
          </Text>
        </Button>
      </Block>
    </Container>
  );
}
