import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Feather } from "@expo/vector-icons";

import { Block, Text } from "galio-framework";

import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import Intro from "../screens/Intro";
import Profile from "../screens/Profile";
import GuestProfile from "../screens/GuestProfile";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Articles from "../screens/Articles";
import CameraScreen from "../screens/CameraScreen";
import ForgotScreen from "../screens/Forgot";
import NewPassScreen from "../screens/NewPass";
import PostImageScreen from "../screens/PostImage";
import NotificationScreen from "../screens/Notification";

import Header from "../components/Header";

const AppStack = createStackNavigator(
  {
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        header: <Block style={{ display: "none" }}></Block>,
        headerTransparent: true,
        drawerLabel: () => {}
      }
    },
    Intro: {
      screen: Intro,
      navigationOptions: {
        header: <Block style={{ display: "none" }}></Block>,
        headerTransparent: true,
        drawerLabel: () => {}
      }
    },
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: null,
        headerTransparent: true
      })
    },
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Feather
            size={24}
            color="#FFF"
            style={{ marginLeft: 10 }}
            name={"chevron-left"}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
        headerTransparent: true
      })
    },
    PostImage: {
      screen: PostImageScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Feather
            size={24}
            color="#FFF"
            style={{ marginLeft: 10 }}
            name={"chevron-left"}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
        headerTransparent: true
      })
    },
    Forgot: {
      screen: ForgotScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Feather
            size={24}
            color="#FFF"
            style={{ marginLeft: 10 }}
            name={"chevron-left"}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
        headerTransparent: true
      })
    },
    NewPass: {
      screen: NewPassScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Feather
            size={24}
            color="#FFF"
            style={{ marginLeft: 10 }}
            name={"chevron-left"}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
        headerTransparent: true
      })
    },
    Camera: {
      screen: CameraScreen,
      headerBackTitle: "Back",
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header
            style={(paddingTop = 20)}
            left={
              <Block flex>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={[styles.logo, { width: 200, height: 60 }]}
                >
                  <Text>{"< Back"}</Text>
                </TouchableOpacity>
              </Block>
            }
            right={<Block />}
            style={{ height: 0 }}
            white
            transparent
            title=""
            navigation={navigation}
          />
        ),
        headerTransparent: true
      })
    },
    Account: {
      screen: Register,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Feather
            size={24}
            color="#FFF"
            style={{ marginLeft: 10 }}
            name={"chevron-left"}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
        headerTransparent: true
      })
    },
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Feather
            size={24}
            color="#FFF"
            style={{ marginLeft: 10 }}
            name={"chevron-left"}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
        headerTransparent: true
      })
    },
    GuestProfile: {
      screen: GuestProfile,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Feather
            size={24}
            color="#FFF"
            style={{ marginLeft: 10 }}
            name={"chevron-left"}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
        headerTransparent: true
      })
    },
    Articles: {
      screen: Articles,
      navigationOptions: ({ navigation }) => ({
        header: null,
        headerTransparent: true
      })
    },
    Post: {
      screen: Articles,
      navigationOptions: ({ navigation }) => ({
        header: null,
        headerTransparent: true
      })
    },
    Notification: {
      screen: NotificationScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
        headerTransparent: true
      })
    }
  }
  // { initialRouteName: "Login" }
);

const AppContainer = createAppContainer(AppStack);

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 30,
    zIndex: 2
  }
});

export default AppContainer;
