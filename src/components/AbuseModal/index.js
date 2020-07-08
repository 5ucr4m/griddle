import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { ActivityIndicator, Text, View, Alert } from "react-native";
import { Checkbox } from "galio-framework";
import Modal from "react-native-modal";
import api from "../../service/api";

import { Container, Content, Title, Button, CloseModal } from "./styles";

function AbuseModal({ visible, close }) {
  const route = useRoute();
  const item = route.params.item;
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const user_id = useSelector((state) => state.session.user.id);

  const handleSubmitAbuse = useCallback(async (description) => {
    setLoading(true);

    const abuse = {
      user_id,
      picture_id: item.picture_id,
      description,
    };

    try {
      await api.post("/abuse", abuse);
      setLoading(false);
      setValues([]);
      close();
    } catch (err) {
      Alert.alert("Someting are wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectAbuse = useCallback((item) => {
    const finded = values.find((x) => x.name === item.name);

    if (!finded) {
      setValues((x) => [...x, item]);
    } else {
      setValues((arr) =>
        arr.map((value) => (value.name === item.name ? item : value))
      );
    }
  }, []);

  const description = useMemo(() => {
    const arrayOfItens = values.filter((item) => item.value);
    return arrayOfItens.length === 0
      ? ""
      : arrayOfItens.map((item) => item.name).join(", ");
  }, [values]);

  return (
    <Container>
      <Modal isVisible={visible} animationIn="slideInUp" avoidKeyboard>
        <Content
          enableAutomaticScroll={true}
          enableOnAndroid={true}
          extraScrollHeight={50}
        >
          <Title style={{ marginTop: 20 }}>Report Abuse!!</Title>
          <View style={{ width: "80%", marginVertical: 20 }}>
            <Checkbox
              color="primary"
              label="Nudity"
              onChange={(check) =>
                handleSelectAbuse({ name: "Nudity", value: check })
              }
              style={{ marginBottom: 10 }}
            />
            <Checkbox
              color="primary"
              label="Profanity"
              onChange={(check) =>
                handleSelectAbuse({ name: "Profanity", value: check })
              }
              style={{ marginBottom: 10 }}
            />
            <Checkbox
              color="primary"
              label="Racism"
              onChange={(check) =>
                handleSelectAbuse({ name: "Racism", value: check })
              }
              style={{ marginBottom: 10 }}
            />
            <Checkbox
              color="primary"
              label="Violence"
              onChange={(check) =>
                handleSelectAbuse({ name: "Violence", value: check })
              }
              style={{ marginBottom: 10 }}
            />
            <Checkbox
              color="primary"
              label="Other"
              onChange={(check) =>
                handleSelectAbuse({ name: "Other", value: check })
              }
              style={{ marginBottom: 10 }}
            />
          </View>
          <Button
            onPress={() => handleSubmitAbuse(description)}
            disabled={!description}
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
