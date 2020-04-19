import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Facebook from "expo-facebook";
import { Block, Text, theme } from "galio-framework";

import {
  StyleSheet,
  Animated,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";

import api from "../../service/api";
import session from "../../service/session";
import * as SessionActions from "../../store/modules/session/actions";

const { width, height } = Dimensions.get("screen");

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [animatedOpacity, setAnimatedOpacity] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function loginWithFacebook() {
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
    } catch ({ message }) {
      console.log(message);
    }
  }

  async function handleLogin() {
    setLoading(true);
    const { data, status } = await session.login(login, password);

    if (status === "success") {
      const { token: appToken, user } = data;

      dispatch(
        SessionActions.addSession(user.id, appToken, user.username, user)
      );
    }

    if (status === "fail") messageFadeIn();

    setLoading(false);
  }

  function messageFadeIn() {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 500,
    }).start();
  }

  function messageFadeOut() {
    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 300,
    }).start();
  }

  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block flex middle>
          <Block style={styles.registerContainer}>
            <Block flex={0.25} middle style={styles.socialConnect}>
              <Text color="#8898AA" size={12}>
                Sign In
              </Text>
              <Block row style={{ marginTop: theme.SIZES.BASE }}>
                <Button
                  style={{ ...styles.socialButtons }}
                  onPress={loginWithFacebook}
                >
                  <Block row>
                    <Icon
                      name="logo-facebook"
                      family="Ionicon"
                      size={14}
                      color={"black"}
                      style={{ marginTop: 2, marginRight: 5 }}
                    />
                    <Text style={styles.socialTextButtons}>Facebook</Text>
                  </Block>
                </Button>
              </Block>
            </Block>
            <Block flex>
              <Block flex={0.17} middle>
                <Text color="#8898AA" size={12}>
                  Or sign in the classic way
                </Text>
              </Block>
              <Block flex={0.17} middle>
                <Animated.View
                  style={[styles.errorMessage, { opacity: animatedOpacity }]}
                >
                  <Text color="#e56b6b" size={12} bold>
                    Wrong E-mail or password
                  </Text>
                </Animated.View>
              </Block>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Email"
                      autoCapitalize="none"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      onChangeText={(input_login) => {
                        messageFadeOut();
                        setLogin(input_login);
                      }}
                      value={login}
                    />
                  </Block>
                  <Block width={width * 0.8}>
                    <Input
                      password
                      borderless
                      placeholder="Password"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="padlock-unlocked"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      onChangeText={(input_password) => {
                        messageFadeOut();
                        setPassword(input_password);
                      }}
                      value={password}
                    />
                  </Block>
                  <Block middle>
                    <Button
                      color="primary"
                      style={styles.createButton}
                      onPress={handleLogin}
                      loading={loading}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Login
                      </Text>
                    </Button>
                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA",
  },
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
    fontWeight: "800",
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
  errorMessage: {
    width: "90%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#e56b6b",
    backgroundColor: "#ffefef",
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
  },
});

export default Login;
