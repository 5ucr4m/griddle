import React, { useState } from "react";
import { Block, Text } from "galio-framework";
import { StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Images, argonTheme } from "../../constants";
import { Button, Input, Icon } from "../../components";
import Masker from "vanilla-masker";
import api from "../../service/api";

import {
  Container,
  ImageBackground,
  Content,
  ContentHeader,
  InputContainer,
} from "./styles";

export default function Forgot() {
  const navigation = useNavigation();
  const route = useRoute();

  const { email } = route.params || "";

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  async function changePass() {
    setLoading(true);
    try {
      await api.post("/users/change_password", {
        email,
        reset_code: code,
        password,
      });
      setLoading(false);
      navigation.navigate("Home");
    } catch (e) {
      setLoading(false);
      setMessage("Invalid verification code!!");
    }
  }

  function changeCode(text) {
    Masker;
  }

  return (
    <Container>
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground source={Images.RegisterBackground}></ImageBackground>
        <Content>
          <ContentHeader>
            <Text>Change your password</Text>
          </ContentHeader>
          <Text color="#DC143C" size={10}>
            {message}
          </Text>
          <InputContainer>
            <Input
              borderless
              placeholder="Verification Code"
              autoCapitalize="none"
              success
              iconContent={
                <Icon
                  size={16}
                  color={argonTheme.COLORS.ICON}
                  name="ic_mail_24px"
                  family="ArgonExtra"
                  style={{ marginRight: 12 }}
                />
              }
              onChangeText={(text) => setCode(text)}
              value={code}
            />
          </InputContainer>
          <InputContainer>
            <Input
              borderless
              placeholder="Password"
              autoCapitalize="none"
              disabled={true}
              secureTextEntry={true}
              iconContent={
                <Icon
                  size={16}
                  color={argonTheme.COLORS.ICON}
                  name="padlock-unlocked"
                  family="ArgonExtra"
                  style={{ marginRight: 12 }}
                />
              }
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </InputContainer>
          <InputContainer>
            <Input
              borderless
              placeholder="Confirm Password"
              autoCapitalize="none"
              textContentType="newPassword"
              secureTextEntry={true}
              iconContent={
                <Icon
                  size={16}
                  color={argonTheme.COLORS.ICON}
                  name="padlock-unlocked"
                  family="ArgonExtra"
                  style={{ marginRight: 12 }}
                />
              }
              onChangeText={(text) => setPasswordConfirmation(text)}
              value={passwordConfirmation}
            />
          </InputContainer>

          <Button
            color="primary"
            loading={loading}
            onPress={changePass}
            style={{ width: "80%" }}
          >
            <Text bold size={14} color={argonTheme.COLORS.WHITE}>
              Send
            </Text>
          </Button>
        </Content>
      </Block>
    </Container>
  );
}
