import React from "react";
import { StyleSheet, Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { useDispatch } from "react-redux";

import * as SessionActions from "../../../store/modules/session/actions";
import { argonTheme } from "../../../constants";
import api from "../../../service/api";

const AppleLogin = () => {
  const dispatch = useDispatch();
  const loginWithApple = async ({ identityToken }) => {
    console.log({ identityToken });
    try {
      const { data } = await api.post("/users/signin_apple", {
        identityToken,
      });

      console.log({ data });

      const { token: appToken, user } = data;
      dispatch(
        SessionActions.addSession(user.id, appToken, user.username, user)
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (Platform.OS !== "ios") {
    return null;
  }

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
      cornerRadius={5}
      style={[styles.socialButtons, { marginLeft: 20 }]}
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });

          console.log(credential);
          loginWithApple({ identityToken: credential.identityToken });
        } catch (e) {
          if (e.code === "ERR_CANCELED") {
            console.log(e);
          } else {
            console.log(e);
          }
        }
      }}
    />
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
});

export default AppleLogin;
