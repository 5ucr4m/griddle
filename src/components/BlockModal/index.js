import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { ActivityIndicator, Text, View, Alert } from "react-native";
import Modal from "react-native-modal";
import api from "../../service/api";

import { loading as getPictures } from "../../store/modules/pictures/actions";
import { Container, Content, Title, Button, CloseModal } from "./styles";

function AbuseModal({ visible, close }) {
  const route = useRoute();
  const dispatch = useDispatch();
  const item = route.params.item;
  const [loading, setLoading] = useState(false);

  const handleSubmitAbuse = useCallback(async () => {
    const { user_id } = item;
    setLoading(true);

    try {
      await api.post("/users/blocked", {
        user_id,
      });
      dispatch(getPictures());
      close();
    } catch (err) {
      Alert.alert("Someting are wrong");
    } finally {
      setLoading(false);
    }

    setLoading(false);
  }, []);

  return (
    <Container>
      <Modal isVisible={visible} animationIn="slideInUp" avoidKeyboard>
        <Content
          enableAutomaticScroll={true}
          enableOnAndroid={true}
          extraScrollHeight={50}
        >
          <Title style={{ marginTop: 20 }}>Block User</Title>
          <View style={{ width: "80%", marginVertical: 20 }}>
            <Text>
              By clicking ok you will be blocking this user from seeing your
              posts.
            </Text>
          </View>
          <Button onPress={handleSubmitAbuse}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Title style={{ fontSize: 13, color: "#fff" }}>OK</Title>
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
