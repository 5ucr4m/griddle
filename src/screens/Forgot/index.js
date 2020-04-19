import React, { useState } from "react";
import { Block, Text } from "galio-framework";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Images, argonTheme } from "../../constants";
import { Button, Input, Icon } from "../../components";
import api from "../../service/api";

import {
  Container,
  ImageBackground,
  Content,
  ContentHeader,
  InputContainer,
} from "./styles";

function Forgot() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function submit() {
    setLoading(true);
    try {
      await api.post("/users/forget_password", { email });
      setMessage("");
      setLoading(false);
      navigation.navigate("NewPassword", { email });
    } catch (e) {
      setMessage("Email not Found!!");
      setLoading(false);
    }
  }

  return (
    <Container>
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground source={Images.RegisterBackground}></ImageBackground>
        <Content>
          <ContentHeader>
            <Text>Forgot user and password</Text>
          </ContentHeader>
          <InputContainer>
            <Text color="#DC143C" size={9}>
              {message}
            </Text>
            <Input
              borderless
              placeholder="Email"
              autoCapitalize="none"
              iconContent={
                <Icon
                  size={16}
                  color={argonTheme.COLORS.ICON}
                  name="ic_mail_24px"
                  family="ArgonExtra"
                  style={{ marginRight: 12 }}
                />
              }
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </InputContainer>

          <Button
            color="primary"
            loading={loading}
            onPress={submit}
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

export default Forgot;
