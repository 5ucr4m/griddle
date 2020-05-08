import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { Container, Content } from "./styles";
import Card from "../../components/Card";

import Header from "../Main/components/Header";
import Footer from "../Main/components/FloatFooter";

const { width } = Dimensions.get("screen");

export default function PostImage() {
  const [photo, setPhoto] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    pickImage();
  }, []);

  async function pickImage() {
    try {
      await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL,
        Permissions.NOTIFICATIONS
      );

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
      });

      if (!result.cancelled) {
        setPhoto({
          photoURI: result.uri,
          base64: result.base64,
          title: "",
          image: result.uri,
          uri: result.uri,
          cta: "",
          id: 230,
          picture_id: -1,
          user_id: 10,
          token: "",
        });
      }
    } catch (err) {}
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Header />
      <Content>
        <Card
          hidePostBox={false}
          refresh={() => {}}
          handleTouch={pickImage}
          options={true}
          navigation={navigation}
          item={{
            id: 50,
            title: "",
            image: photo.photoURI,
            uri: photo.photoURI,
            cta: "",
            base64: photo.base64,
            token: photo.token,
            user_id: photo.user_id,
          }}
          full
          style={{
            position: "absolute",
            top: 40,
            left: 10,
            width: width - 40,
          }}
        />
      </Content>
      <Footer />
    </Container>
  );
}
