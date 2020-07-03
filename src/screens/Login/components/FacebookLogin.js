import React from "react";
import * as Facebook from "expo-facebook";
import { Block, Text } from "galio-framework";
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
      await Facebook.initializeAsync("562014587974431");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      if (type === "success") {
        const { data } = await api.post("/users/signin_fb", {
          token_fb: token,
        });

        const { token: appToken, user } = data;
        dispatch(
          SessionActions.addSession(user.id, appToken, user.username, user)
        );
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {}
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
