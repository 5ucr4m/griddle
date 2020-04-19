import * as React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";
import NewPasswordScreen from "../screens/NewPass";
import ForgotScreen from "../screens/Forgot";
import RegisterScreen from "../screens/Register";
import IntroScreen from "../screens/Intro";

import MainScreen from "../screens/Main";

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const SessionStack = createStackNavigator();

const defaultOptions = {
  headerShown: false,
};

function SessionStackScreens() {
  return (
    <SessionStack.Navigator>
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
      <AuthStack.Screen name="Main" component={MainScreen} />
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
