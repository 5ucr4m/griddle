import React from "react";
import { StyleSheet, Platform } from "react-native";
import * as Crypto from "expo-crypto";
import * as AppleAuthentication from "expo-apple-authentication";
import { useDispatch } from "react-redux";

import * as SessionActions from "../../../store/modules/session/actions";
import { argonTheme } from "../../../constants";
import api from "../../../service/api";

const AppleLogin = () => {
  const dispatch = useDispatch();

  const loginWithApple = async ({ identityToken, email, state }) => {
    console.log({ identityToken, email, state });
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

  async function handlePressButton() {
    try {
      const csrf = Math.random().toString(36).substring(2, 15);
      const nonce = Math.random().toString(36).substring(2, 10);
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        nonce
      );

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        state: csrf,
        nonce: hashedNonce,
      });

      console.log(credential);
      const { identityToken, email, state } = credential;
      loginWithApple({ identityToken, email, state });
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
        console.log(e);
      } else {
        console.log(e);
      }
    }
  }

  if (Platform.OS !== "ios") {
    return null;
  }

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
      cornerRadius={5}
      style={[styles.socialButtons, { marginLeft: 20 }]}
      onPress={handlePressButton}
    ></AppleAuthentication.AppleAuthenticationButton>
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
    marginLeft: 20,
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppleLogin;
