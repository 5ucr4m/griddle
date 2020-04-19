import React, { useState, useEffect } from "react";
import { TextInput, ActivityIndicator } from "react-native";
import { Text } from "galio-framework";

import api from "../../../service/api";

import { Container } from "./styles";
import { Block } from "../styles";

import { argonTheme } from "../../../constants";
import { Button, Icon, Input } from "../../../components";

export default function Step01({ next, data }) {
  const [last_name, setLast_name] = useState(data.last_name || "");
  const [first_name, setFirst_name] = useState(data.first_name || "");
  const [login, setLogin] = useState(data.login || "");
  const [password, setPassword] = useState(data.password || "");
  const [message, setMessage] = useState("");
  const [avaliable, setAvaliable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);

  useEffect(() => {
    first_name.length > 3 &&
      last_name.length > 3 &&
      login.length > 3 &&
      password.length > 3 &&
      !!avaliable &&
      setDisabledBtn(false);
  }, [first_name, last_name, login, password]);

  async function handleCheckUser() {
    setLoading(true);
    const { data } = await api.post("/users/check", {
      email: login,
    });
    setLoading(false);
    setAvaliable(data.avaliable);
  }

  return (
    <Container>
      <Block>
        <TextInput />
        <Input
          password={false}
          borderless
          onBlur={handleCheckUser}
          autoCapitalize="none"
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(input_email) => {
            setLogin(input_email);
            setMessage("");
          }}
          iconContent={
            loading ? (
              <ActivityIndicator size={16} style={{ marginRight: 12 }} />
            ) : (
              <Icon
                size={16}
                color={argonTheme.COLORS.ICON}
                name="ic_mail_24px"
                family="ArgonExtra"
                style={{ marginRight: 12 }}
              />
            )
          }
        />
        {avaliable !== null && !avaliable && (
          <Text style={{ color: "red" }}>
            <Icon size={14} color="red" name="x" family="Feather" />
            {"   "}
            Email are already in use
          </Text>
        )}
        {avaliable !== null && avaliable && (
          <Text style={{ color: "green" }}>
            <Icon size={14} color="green" name="check" family="Feather" />
            {"   "}
            Avaliable
          </Text>
        )}
      </Block>
      <Block>
        <Input
          borderless
          placeholder="First Name"
          autoCapitalize="words"
          onChangeText={(input_fname) => {
            setFirst_name(input_fname);
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
          autoCapitalize="words"
          onChangeText={(input_lname) => {
            setLast_name(input_lname);
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
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={(input_password) => {
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
          color={disabledBtn ? "DISABLED" : "primary"}
          disabled={disabledBtn}
          onPress={() =>
            next({ login, password, profile: { first_name, last_name } })
          }
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
