import React from "react";
import * as Facebook from "expo-facebook";
import session from "../service/session";
import UserDB from "../service/sqlite/user";
import UserAccessDB from "../service/sqlite/user_access";

import {
  StyleSheet,
  Animated,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  BackHandler
} from "react-native";

import { Block, Text, theme } from "galio-framework";
import * as SQLite from "expo-sqlite";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import api from "../service/api";

const { width, height } = Dimensions.get("screen");

const db = SQLite.openDatabase("griddledb.db");

class Login extends React.Component {
  state = {
    login: "",
    password: "",
    message: "",
    animatedOpacity: new Animated.Value(0),
    loading: false
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ loading: false });
    this.cleanUp();
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate("Onboarding");
      return true;
    });
  }

  componentWillMount() {
    UserDB.createTable();
    UserAccessDB.createTable();
  }

  //   componentWillUnmount() {
  //     this.backHandler.remove();
  //   }

  loginFB = async () => {
    try {
      await Facebook.initializeAsync("562014587974431");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"]
      });
      if (type === "success") {
        const { data } = await api.post("/users/signin_fb", {
          token_fb: token
        });
        console.log(data);
        this.redirectWithToken(data);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log(message);
    }
  };

  redirectWithToken = async res => {
    const { navigation } = this.props;
    if (res !== null) {
      this.cleanUp();
      if (res.token) {
        try {
          db.transaction(tx => {
            tx.executeSql(
              "insert into user (token, user) values(?,?);",
              [res.token, JSON.stringify(res.user)],
              (tx, results) => {
                this.success(navigation);
              },
              (tx, error) => {}
            );
          });
        } catch (err) {
          this.setState({
            message: "Error: " + err.message,
            login: "",
            password: ""
          });
        }
      } else {
        this.setState({
          message: "Invalid Credentials",
          login: "",
          password: ""
        });
      }
    } else {
      this.setState({
        message: "Invalid Credentials",
        login: "",
        password: ""
      });
    }
  };

  async getUserData(userId, token, navigation, screen = "Home") {
    var localUser = {
      fname: "",
      lname: "",
      profile: {
        city: null,
        county: null,
        createdAt: null,
        facebook: null,
        id: null,
        instagram: null,
        linkedin: null,
        number: null,
        phone: null,
        picture: null,
        pinterest: null,
        state: null,
        street: null,
        twitter: null,
        updatedAt: null
      }
    };

    await fetch("http://67.227.214.144:3010/users/" + userId, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res !== null) {
          console.log(localUser);
          localUser = {
            fname: res.profile.first_name,
            lname: res.profile.last_name,
            profile: {
              city: res.profile.city,
              county: res.profile.county,
              createdAt: res.profile.createdAt,
              facebook: res.profile.facebook,
              id: res.profile.id,
              instagram: res.profile.instagram,
              linkedin: res.profile.linkedin,
              number: res.profile.number,
              phone: res.profile.phone,
              picture: res.profile.picture,
              pinterest: res.profile.pinterest,
              state: res.profile.state,
              street: res.profile.street,
              twitter: res.profile.twitter,
              updatedAt: res.profile.updatedAt
            }
          };

          try {
            db.transaction(tx => {
              tx.executeSql(
                "update user set profile = ?;",
                [JSON.stringify(localUser)],
                (tx, results) => {
                  if (results.rowsAffected) {
                    navigation.navigate("Onboarding", {
                      reset: false,
                      logoff: false,
                      screen: screen
                    });
                  }
                },
                (tx, error) => {}
              );
            });
          } catch (err) {}
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  cleanUp = () => {
    UserDB.dropTable();
  };

  async success(navigation) {
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM user;", [], (tx, results) => {
        console.log(" -------- ", results.rows.item(0));
        this.getUserData(
          JSON.parse(results.rows.item(0).user).id,
          results.rows.item(0).token,
          navigation,
          "Home"
        );
      });
    });
  }

  handleLogin = async () => {
    if (this.state.loading) return;
    this.setState({ loading: true });

    const { login, password } = this.state;
    const response = await session.login(login, password);

    if (response.status === "success") this.redirectWithToken(response.data);
    if (response.status === "fail") this.messageFadeIn();

    this.setState({ loading: false });
  };

  messageFadeIn() {
    Animated.timing(this.state.animatedOpacity, {
      toValue: 1,
      duration: 500
    }).start();
  }

  messageFadeOut() {
    Animated.timing(this.state.animatedOpacity, {
      toValue: 0,
      duration: 300
    }).start();
  }

  render() {
    const { navigation } = this.props;
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
                    onPress={this.loginFB}
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
                    style={[
                      styles.errorMessage,
                      { opacity: this.state.animatedOpacity }
                    ]}
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
                        onChangeText={input_login => {
                          this.messageFadeOut();
                          this.setState({ login: input_login, message: "" });
                        }}
                        value={this.state.login}
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
                        onChangeText={input_password => {
                          this.messageFadeOut();
                          this.setState({
                            password: input_password,
                            message: ""
                          });
                        }}
                        value={this.state.password}
                      />
                    </Block>

                    <Block flex={0.17} middle>
                      <Text color="red" size={16}>
                        {this.state.message}
                      </Text>
                    </Block>
                    {navigation.getParam("registered") && (
                      <Block flex={0.17} middle>
                        <Text color="darkgreen" size={16}>
                          {navigation.getParam("message")}
                        </Text>
                      </Block>
                    )}

                    <Block middle>
                      <Button
                        color="primary"
                        style={styles.createButton}
                        onPress={this.handleLogin}
                        loading={this.state.loading}
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
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
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
    borderRadius: 3
  }
});

export default Login;
