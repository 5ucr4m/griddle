import React from "react";
import * as Facebook from "expo-facebook";
import { Block, Text } from "galio-framework";
import { Alert } from "react-native";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { Button, Icon } from "../../../components";
import { argonTheme } from "../../../constants";

import * as SessionActions from "../../../store/modules/session/actions";

import api from "../../../service/api";

const FacebookLogin = () => {
  const dispatch = useDispatch();

  const loginWithFacebook = async () => {
    try {
      await Facebook.initializeAsync("268431247257894");
      const response = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      const { type, token } = response;
      console.log("facebook data: ", response);

      if (type === "success") {
        // console.log("success data: ", response);
        const { data } = await api.post("/users/signin_fb", {
          identityToken: token,
        });

        const { token: appToken, user } = data;
        dispatch(
          SessionActions.addSession(user.id, appToken, user.username, user)
        );
      } else {
        Alert.alert("Error");
      }
    } catch (error) {
      console.log(error.data);
    }
  };

  return (
    <Button style={{ ...styles.socialButtons }} onPress={loginWithFacebook}>
      <Block row middle center>
        <Icon
          name="logo-facebook"
          family="Ionicon"
          size={18}
          color={argonTheme.COLORS.PRIMARY}
          style={{ marginRight: 5 }}
        />
        <Text style={styles.socialTextButtons}>Facebook</Text>
      </Block>
    </Button>
  );
};

const styles = StyleSheet.create({
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default FacebookLogin;
