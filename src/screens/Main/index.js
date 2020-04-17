import React from "react";
import { useDispatch } from "react-redux";
import { SafeAreaView, Text, TouchableHighlight } from "react-native";

import * as SessionActions from "../../store/modules/session/actions";

export default function Main() {
  const dispatch = useDispatch();
  function logout() {
    dispatch(SessionActions.logout());
  }
  return (
    <SafeAreaView>
      <Text>Main</Text>
      <TouchableHighlight
        onPress={logout}
        style={{
          borderWidth: 1,
          padding: 20,
          width: 100,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Logout</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}
