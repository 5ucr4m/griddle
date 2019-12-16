import React from "react";
import { Block, Text } from "galio-framework";
import { StatusBar } from "react-native";
import { Images, argonTheme } from "../../constants";
import { Button, Input, Icon } from "../../components";

import {
  Container,
  ImageBackground,
  Content,
  ContentHeader,
  InputContainer,
  ButtonContainer
} from "./styles";

export default function Forgot() {
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
              placeholder="Email ---"
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
              onChangeText={() => {}}
              value="teste@gmail.com"
            />
          </InputContainer>

          <Button color="primary" onPress={() => {}} style={{ width: "80%" }}>
            <Text bold size={14} color={argonTheme.COLORS.WHITE}>
              Send
            </Text>
          </Button>
        </Content>
      </Block>
    </Container>
  );
}
