import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { Block, theme } from "galio-framework";

import argonTheme from "../constants/Theme";

export default function BellNotification() {
  const unreadNotifications = useSelector(
    state => state.notifies.unreadNotifications
  );

  console.log(unreadNotifications);

  return unreadNotifications ? (
    <Block middle style={styles.notify}></Block>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: "absolute",
    top: 9,
    right: 12
  }
});
