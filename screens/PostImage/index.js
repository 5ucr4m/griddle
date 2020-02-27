import React, { useEffect, useState } from "react";
import { withNavigation } from "react-navigation";
import { Dimensions } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { Container, Content } from "./styles";
import { Card } from "../../components";

import Header from "../Home/components/Header";
import Footer from "../Home/components/FloatFooter";

const { height, width } = Dimensions.get("screen");

function PostImage({ navigation }) {
  const [photo, setPhoto] = useState({});

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
        base64: true
        // aspect: [3, 4]
      });

      if (!result.cancelled) {
        console.log({
          result: result
        });
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
          token: ""
        });
      } else {
        console.log("cancelou");
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Container>
      <Header />
      <Content>
        <Card
          hidePostBox={false}
          refresh={() => {}}
          handleTouch={pickImage}
          options={true}
          item={{
            id: 50,
            title: "",
            image: photo.photoURI,
            uri: photo.photoURI,
            cta: "",
            base64: photo.base64,
            token: photo.token,
            user_id: photo.user_id
          }}
          full
          style={{
            position: "absolute",
            top: 40,
            left: 10,
            width: width - 40
          }}
        />
      </Content>
      <Footer />
    </Container>
  );
}

export default withNavigation(PostImage);
