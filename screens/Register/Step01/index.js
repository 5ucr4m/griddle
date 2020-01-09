import React, { useState } from "react";
import { Checkbox, Text } from "galio-framework";

import { Container } from "./styles";
import { Block } from "../styles";

import { argonTheme } from "../../../constants";
import { Button, Icon, Input } from "../../../components";

export default function Step01({ next }) {
  const [lname, setLname] = useState("");
  const [fname, setFname] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  return (
    <Container>
      <Block>
        <Input
          password={false}
          borderless
          placeholder="Email"
          onChangeText={input_email => {
            setLogin(input_email);
            setMessage("");
          }}
          iconContent={
            <Icon
              size={16}
              color={argonTheme.COLORS.ICON}
              name="ic_mail_24px"
              family="ArgonExtra"
              style={{ marginRight: 12 }}
            />
          }
        />
      </Block>
      <Block>
        <Input
          borderless
          placeholder="First Name"
          onChangeText={input_fname => {
            setFname(input_fname);
            setMessage("");
          }}
          iconContent={
            <Icon
              size={16}
              color={argonTheme.COLORS.ICON}
              name="hat-3"
              family="ArgonExtra"
              style={{ marginRight: 12 }}
            />
          }
        />
      </Block>
      <Block>
        <Input
          borderless
          placeholder="Last Name"
          onChangeText={input_lname => {
            setLname(input_lname);
            setMessage("");
          }}
          iconContent={
            <Icon
              size={16}
              color={argonTheme.COLORS.ICON}
              name="hat-3"
              family="ArgonExtra"
              style={{ marginRight: 12 }}
            />
          }
        />
      </Block>
      <Block>
        <Input
          password={true}
          borderless
          placeholder="Password"
          onChangeText={input_password => {
            setPassword(input_password);
            setMessage("");
          }}
          iconContent={
            <Icon
              size={16}
              color={argonTheme.COLORS.ICON}
              name="padlock-unlocked"
              family="ArgonExtra"
              style={{ marginRight: 12 }}
            />
          }
        />
      </Block>
      <Block flex={0.17} middle>
        <Text color="red" size={16}>
          {message}
        </Text>
      </Block>
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
