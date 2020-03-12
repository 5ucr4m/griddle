import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import Modal from "react-native-modal";
import { Container, Content, Title, TextArea, Button } from "./styles";

export default function AbuseModal() {
  const [visible, setVisible] = useState(true);
  return (
    <Container>
      <Modal isVisible={visible} animationIn="slideInUp">
        <Content>
          <Title>Report Abuse!!</Title>
          <TextArea multiline={true} numberOfLines={4} returnKeyType="done" />
          <Button onPress={() => setVisible(!visible)}>
            <Title style={{ fontSize: 13, color: "#fff" }}>Send</Title>
          </Button>
        </Content>
      </Modal>
    </Container>
  );
}
