import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";

import {
  withNavigation,
  StackActions,
  NavigationActions
} from "react-navigation";

import { Container, Content, Button } from "./styles";

import HomeIcon from "../../../../assets/icons/home.png";
import EmailIcon from "../../../../assets/icons/email.png";
import CamIcon from "../../../../assets/icons/cam.png";
import QuestionIcon from "../../../../assets/icons/question.png";
import UserIcon from "../../../../assets/icons/user.png";
import XIcon from "../../../../assets/icons/x.png";
import PlusIcon from "../../../../assets/icons/plus.png";

const { width } = Dimensions.get("screen");

const objWidth = 40;
const mainObjWidth = 70;
const halfObj = objWidth / 2;
const final = (width + objWidth) / 3.5;
const half = (final + objWidth) / 2;

function FloatFooter({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [opacity] = useState(new Animated.Value(0));
  const [positionX] = useState(new Animated.Value(5));
  const [positionY] = useState(new Animated.Value(5));
  const [halfPositionX] = useState(new Animated.Value(5));
  const [halfPositionY] = useState(new Animated.Value(5));
  const [positionIconCenter] = useState(new Animated.Value(5));

  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "PostImage" })]
  });

  function nav(page) {
    setVisible(false);
    handleClose();
    navigation.navigate(page);
  }

  function handleOpen() {
    setVisible(true);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250
      }),

      Animated.timing(positionY, {
        toValue: halfObj,
        duration: 300
      }),

      Animated.timing(positionX, {
        toValue: -final,
        duration: 300
      }),

      Animated.timing(halfPositionY, {
        toValue: half + 15,
        duration: 300
      }),

      Animated.timing(halfPositionX, {
        toValue: -half,
        duration: 300
      }),

      Animated.timing(positionIconCenter, {
        toValue: final,
        duration: 300
      })
    ]).start();
  }

  function handleClose() {
    setVisible(false);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250
      }),
      Animated.timing(positionX, {
        toValue: 5,
        duration: 300
      }),

      Animated.timing(positionY, {
        toValue: 5,
        duration: 300
      }),

      Animated.timing(halfPositionX, {
        toValue: 5,
        duration: 300
      }),

      Animated.timing(halfPositionY, {
        toValue: 5,
        duration: 300
      }),

      Animated.timing(positionIconCenter, {
        toValue: 5,
        duration: 300
      })
    ]).start();
  }
  //   handleOpen();
  return (
    <Container>
      <Content>
        <Button onPress={visible ? handleClose : handleOpen}>
          {visible ? (
            <Image source={XIcon} style={{ width: 30, height: 30 }} />
          ) : (
            <Image source={PlusIcon} style={{ width: 30, height: 30 }} />
          )}
        </Button>
        <Animated.View
          style={[
            styles.iconBase,
            { left: positionX, bottom: positionY, opacity: opacity }
          ]}
        >
          <TouchableOpacity onPress={() => nav("Home")}>
            <Image source={HomeIcon} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.iconBase,
            { left: halfPositionX, bottom: halfPositionY, opacity: opacity }
          ]}
        >
          <TouchableOpacity onPress={() => console.log("press")}>
            <Image source={EmailIcon} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.iconBase,
            {
              left: (mainObjWidth - objWidth) / 2,
              bottom: positionIconCenter,
              opacity: opacity
            }
          ]}
        >
          <TouchableOpacity onPress={() => navigation.dispatch(resetAction)}>
            <Image source={CamIcon} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.iconBase,
            { right: halfPositionX, bottom: halfPositionY, opacity: opacity }
          ]}
        >
          <TouchableOpacity onPress={() => nav("Notification")}>
            <Image source={QuestionIcon} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.iconBase,
            { right: positionX, bottom: positionY, opacity: opacity }
          ]}
        >
          <TouchableOpacity onPress={() => nav("Profile")}>
            <Image source={UserIcon} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </Animated.View>
      </Content>
    </Container>
  );
}

export default withNavigation(FloatFooter);

const styles = StyleSheet.create({
  iconBase: {
    position: "absolute",
    width: objWidth,
    height: objWidth,
    borderRadius: objWidth,
    backgroundColor: "rgba(51, 34, 134, 0.6)",
    zIndex: 98,
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 10 },
    justifyContent: "center",
    alignItems: "center"
  }
});