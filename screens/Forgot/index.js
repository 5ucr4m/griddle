import React, { useState } from "react";
import { Block, Text } from "galio-framework";
import { StatusBar } from "react-native";
import { withNavigation } from "react-navigation";
import { Images, argonTheme } from "../../constants";
import { Button, Input, Icon } from "../../components";

import {
  Container,
  ImageBackground,
  Content,
  ContentHeader,
  InputContainer
} from "./styles";

function Forgot({ navigation }) {
  const [email, setEmail] = useState("teste@gmail.com");

  function submit() {
    navigation.navigate("NewPass");
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
              onChangeText={text => setEmail(text)}
              value={email}
            />
          </InputContainer>

          <Button color="primary" onPress={submit} style={{ width: "80%" }}>
            <Text bold size={14} color={argonTheme.COLORS.WHITE}>
              Send
            </Text>
          </Button>
        </Content>
      </Block>
    </Container>
  );
}

export default withNavigation(Forgot);
