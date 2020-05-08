import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { ActivityIndicator, Text } from "react-native";
import Modal from "react-native-modal";
import api from "../../service/api";

import {
  Container,
  Content,
  Title,
  TextArea,
  Button,
  CloseModal,
} from "./styles";

function AbuseModal({ visible, close }) {
  const route = useRoute();
  const item = route.params.item;
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const user_id = useSelector((state) => state.session.user.id);

  async function handleSubmitAbuse() {
    setLoading(true);
    const abuse = {
      user_id,
      picture_id: item.picture_id,
      description,
    };
    await api.post("/abuse", abuse);
    setLoading(false);
    setDescription("");
    close();
  }

  return (
    <Container>
      <Modal isVisible={visible} animationIn="slideInUp" avoidKeyboard>
        <Content
          enableAutomaticScroll={true}
          enableOnAndroid={true}
          extraScrollHeight={50}
        >
          <Title style={{ marginTop: 20 }}>Report Abuse!!</Title>
          <TextArea
            multiline={true}
            numberOfLines={4}
            returnKeyType="done"
            value={description}
            onChangeText={setDescription}
            scrollEnabled={false}
          />
          <Button
            onPress={handleSubmitAbuse}
            disabled={description.length <= 3}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Title style={{ fontSize: 13, color: "#fff" }}>Send</Title>
            )}
          </Button>
          <CloseModal
            onPress={close}
            style={{ marginVertical: 5, backgroundColor: "#000" }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
              X
            </Text>
          </CloseModal>
        </Content>
      </Modal>
    </Container>
  );
}

export default AbuseModal;
