import React from "react";
import { useSelector } from "react-redux";
import { Block, Text } from "galio-framework";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, FontAwesome, Entypo } from "@expo/vector-icons";
import * as Facebook from "expo-facebook";

import * as Crypto from "expo-crypto";
import * as AppleAuthentication from "expo-apple-authentication";
import { useDispatch } from "react-redux";

import * as SessionActions from "../../store/modules/session/actions";
import api from "../../service/api";

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 20,
  },
  icon: { width: 50 },
});

const Accounts = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const login = async ({ identityToken, provider }) => {
    const user_id = user.data.id;
    try {
      const { data } = await api.post(`/users/${provider}`, {
        user_id,
        identityToken,
      });

      const { token: appToken, user } = data;
      dispatch(
        SessionActions.addSession(user.id, appToken, user.username, user)
      );
    } catch (err) {
      console.log(err);
    }
  };

  async function handlePressButtonAddAppleAccount() {
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
      const { identityToken } = credential;
      login({ identityToken, provider: "signin_apple" });
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
        console.log(e);
      } else {
        console.log(e);
      }
    }
  }

  const handlePressButtonAddFacebookAccount = async () => {
    try {
      await Facebook.initializeAsync("268431247257894");
      const response = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      const { type, token: identityToken } = response;

      if (type === "success") {
        login({ identityToken, provider: "signin_fb" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.main}
        onPress={handlePressButtonAddFacebookAccount}
      >
        <Entypo name="facebook" size={40} color="#3b5998" style={styles.icon} />
        <Text style={{ marginLeft: 10, flex: 1 }}>Facebook</Text>
        {!!user.data.facebook_id && (
          <Feather name="check" size={18} color="green" />
        )}
      </TouchableOpacity>
      <Block style={{ width: "100%", backgroundColor: "#ddd", height: 1 }} />
      <TouchableOpacity
        style={styles.main}
        onPress={handlePressButtonAddAppleAccount}
      >
        <FontAwesome name="apple" size={40} color="#000" style={styles.icon} />
        <Text style={{ marginLeft: 10, flex: 1 }}>Apple</Text>
        {!!user.data.apple_id && (
          <Feather name="check" size={18} color="green" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Accounts;
