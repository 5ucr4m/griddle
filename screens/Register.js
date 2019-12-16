import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
  state = {
    lname: "",
    fname: "",
    login: "",
    username: "",
    password: "",
    policy: false,
    message: ""
  };

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
              <ScrollView>
                <Block flex={0.25} middle style={styles.socialConnect}>
                  <Block row style={{ marginTop: theme.SIZES.BASE }}>
                    <Block style={{ height: 50 }}></Block>
                    {/* <Button
                      style={{ ...styles.socialButtons, marginRight: 30 }}
                    >
                      <Block row>
                        <Icon
                          name="logo-facebook"
                          family="Ionicon"
                          size={14}
                          color={"black"}
                          style={{ marginTop: 2, marginRight: 5 }}
                        />
                        <Text style={styles.socialTextButtons}>FACEBOOK</Text>
                      </Block>
                    </Button> */}
                  </Block>
                </Block>
                <Block flex>
                  {/* <Block flex={0.17} middle>
                    <Text color="#8898AA" size={12}>
                      Or sign up the classic way
                    </Text>
                  </Block> */}
                  <Block flex center>
                    <KeyboardAvoidingView
                      style={{ flex: 1 }}
                      behavior="padding"
                      enabled
                    >
                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Input
                          borderless
                          placeholder="Username"
                          autoFocus={true}
                          onChangeText={username =>
                            this.setState({ username: username, message: "" })
                          }
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="user"
                              family="Feather"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Input
                          borderless
                          placeholder="First Name"
                          onChangeText={input_fname =>
                            this.setState({ fname: input_fname, message: "" })
                          }
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="hat-3"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>

                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Input
                          borderless
                          placeholder="Last Name"
                          onChangeText={input_lname =>
                            this.setState({ lname: input_lname, message: "" })
                          }
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="hat-3"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>

                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Input
                          password={false}
                          borderless
                          placeholder="Email"
                          onChangeText={input_email =>
                            this.setState({ login: input_email, message: "" })
                          }
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="ic_mail_24px"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block width={width * 0.8}>
                        <Input
                          password={true}
                          borderless
                          placeholder="Password"
                          onChangeText={input_password =>
                            this.setState({
                              password: input_password,
                              message: ""
                            })
                          }
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="padlock-unlocked"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block row width={width * 0.75}>
                        <Checkbox
                          checkboxStyle={{
                            borderWidth: 3
                          }}
                          color={argonTheme.COLORS.PRIMARY}
                          label="I agree with the Privacy Policy"
                          onChange={input_policy =>
                            this.setState({ policy: input_policy })
                          }
                        />
                      </Block>
                      <Block flex={0.17} middle>
                        <Text color="red" size={16}>
                          {this.state.message}
                        </Text>
                      </Block>
                      <Block middle>
                        <Button
                          color="primary"
                          style={styles.createButton}
                          onPress={() => {
                            if (
                              this.state.policy &&
                              this.state.login &&
                              this.state.username &&
                              this.state.password &&
                              this.state.fname &&
                              this.state.lname
                            ) {
                              //   fetch("http://67.227.214.144:3010/users/signup", {
                              fetch("http://67.227.214.144:3010/users/signup", {
                                method: "POST",
                                cache: "no-cache",
                                credentials: "same-origin", // include, *same-origin, omit
                                headers: {
                                  "Content-Type": "application/json"
                                  // 'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: JSON.stringify({
                                  username: this.state.username,
                                  email: this.state.login,
                                  password: this.state.password,
                                  profile: {
                                    first_name: this.state.fname,
                                    last_name: this.state.lname
                                  }
                                })
                              })
                                .then(res => res.json())
                                .then(res => {
                                  if (res !== null) {
                                    //   console.log([res, navigation]);
                                    navigation.navigate("Login", {
                                      login: this.state.login,
                                      registered: true,
                                      message:
                                        this.state.fname +
                                        ", you were successfully registered."
                                    });
                                  } else {
                                    this.setState({
                                      message: "Something went wrong.",
                                      username: "",
                                      fname: "",
                                      lname: "",
                                      login: "",
                                      password: ""
                                    });
                                  }
                                })
                                .catch(error => {
                                  // console.log("get data error:", error);
                                });
                            } else {
                              this.setState({
                                message:
                                  "You must fill all fields to be registered."
                              });
                            }
                          }}
                        >
                          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                            CREATE ACCOUNT
                          </Text>
                        </Button>
                      </Block>
                    </KeyboardAvoidingView>
                  </Block>
                </Block>
              </ScrollView>
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
  }
});

export default Register;
