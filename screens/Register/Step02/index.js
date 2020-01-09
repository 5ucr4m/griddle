import React, { useState } from "react";

import { Container, Form, Text } from "./styles";
import { Block } from "../styles";

import { argonTheme } from "../../../constants";
import { Button, Icon, Input } from "../../../components";

export default function Step02({ next }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [disabledBtn, setDisabledBtn] = useState(true);

  return (
    <Container>
      <Form>
        <Block>
          <Input
            borderless
            success
            placeholder="Username"
            onBlur={() => setMessageType("error")}
            onChangeText={username => {
              setUsername(username);
            }}
            iconContent={
              <Icon
                size={16}
                color={argonTheme.COLORS.ICON}
                name="user"
                family="Feather"
                style={{ marginRight: 12 }}
              />
            }
          />
          {messageType === "error" && (
            <Text error>
              <Icon size={14} color="red" name="x" family="Feather" />
              {"   "}
              Not avaliable
            </Text>
          )}
          {messageType === "success" && (
            <Text success>
              <Icon size={14} color="green" name="check" family="Feather" />
              {"   "}
              Avaliable
            </Text>
          )}
        </Block>
        <Block>
          <Input
            borderless
            placeholder="Phone Number"
            onChangeText={input_phone => {
              setPhone(input_phone);
            }}
            iconContent={
              <Icon
                size={16}
                color={argonTheme.COLORS.ICON}
                name="phone"
                family="Feather"
                style={{ marginRight: 12 }}
              />
            }
          />
        </Block>
      </Form>
      <Block>
        <Button
          color={disabledBtn ? "DISABLED" : "primary"}
          disabled={disabledBtn}
          onPress={() => next()}
          style={{ width: "100%" }}
        >
          <Text
            bold
            size={14}
            color={
              disabledBtn ? argonTheme.COLORS.MUTED : argonTheme.COLORS.WHITE
            }
          >
            NEXT STEP
          </Text>
        </Button>
      </Block>
    </Container>
  );
}
