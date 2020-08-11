import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Block } from "galio-framework";

import { argonTheme } from "../constants";

import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";
import NewPasswordScreen from "../screens/NewPass";
import ForgotScreen from "../screens/Forgot";
import RegisterScreen from "../screens/Register";
import IntroScreen from "../screens/Intro";

import MainScreen from "../screens/Main";
import ProfileScreen from "../screens/Profile";
import ArticlesScreen from "../screens/Articles";
import NotificationScreen from "../screens/Notification";
import PostImageScreen from "../screens/PostImage";
import GuestProfileScreen from "../screens/GuestProfile";
import AccountsScreen from "../screens/Accounts";

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const SessionStack = createStackNavigator();

const defaultOptions = {
  headerShown: false,
};

function SessionStackScreens() {
  const [loading, setLoading] = React.useState(false);
  const [isFirstTime, setIsFirstTime] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    async function load() {
      const response = await SecureStore.getItemAsync("griddle-first");
      setIsFirstTime(!response);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <></>;
  }

  //
  return (
    <SessionStack.Navigator initialRouteName={isFirstTime ? "Intro" : "Home"}>
      <SessionStack.Screen
        name="Intro"
        component={IntroScreen}
        options={defaultOptions}
      />

      <SessionStack.Screen
        name="Home"
        component={HomeScreen}
        options={defaultOptions}
      />

      <SessionStack.Screen
        name="Login"
        component={LoginScreen}
        options={defaultOptions}
      />

      <SessionStack.Screen
        name="Forgot"
        component={ForgotScreen}
        options={defaultOptions}
      />

      <SessionStack.Screen
        name="NewPassword"
        component={NewPasswordScreen}
        options={defaultOptions}
      />

      <SessionStack.Screen
        name="Register"
        component={RegisterScreen}
        options={defaultOptions}
      />
    </SessionStack.Navigator>
  );
}

function AuthStackScreens() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Main"
        component={MainScreen}
        options={defaultOptions}
      />
      <AuthStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={defaultOptions}
      />
      <AuthStack.Screen
        name="Articles"
        component={ArticlesScreen}
        options={defaultOptions}
      />
      <AuthStack.Screen
        name="Notification"
        component={NotificationScreen}
        options={defaultOptions}
      />
      <AuthStack.Screen
        name="PostImage"
        component={PostImageScreen}
        options={defaultOptions}
      />

      <AuthStack.Screen
        name="GuestProfile"
        component={GuestProfileScreen}
        options={defaultOptions}
      />

      <AuthStack.Screen
        name="Accounts"
        component={AccountsScreen}
        options={{
          headerLeft: (props) => (
            <TouchableOpacity
              style={{
                marginLeft: 10,
                height: 40,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
              {...props}
            >
              <Feather name="chevron-left" size={20} color="white" />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: argonTheme.COLORS.PRIMARY },
          headerTintColor: "#fff",
          title: "linked social accounts",
        }}
      />
    </AuthStack.Navigator>
  );
}

export default function Routes() {
  const isAuthenticated = useSelector((store) => !!store.session.token);

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {isAuthenticated ? (
          <RootStack.Screen
            name="MainStack"
            component={AuthStackScreens}
            options={defaultOptions}
          />
        ) : (
          <RootStack.Screen
            name="Session"
            component={SessionStackScreens}
            options={defaultOptions}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
