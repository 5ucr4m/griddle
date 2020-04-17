import * as React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";

import MainScreen from "../screens/Main";

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const SessionStack = createStackNavigator();

function SessionStackScreens() {
  return (
    <SessionStack.Navigator>
      <SessionStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <SessionStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
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
          <>
            <RootStack.Screen name="Main" component={MainScreen} />
          </>
        ) : (
          <RootStack.Screen
            name="Session"
            component={SessionStackScreens}
            options={{
              headerShown: false,
            }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
