import React from "react";
import { DrawerItems } from "react-navigation";

import { ScrollView, StyleSheet, Dimensions, Image } from "react-native";
import { Block, theme, Button, Text } from "galio-framework";
import { Images, argonTheme } from "../constants";

const { width } = Dimensions.get("screen");

const Drawer = props => (
  <Block
    style={styles.container}
    forceInset={{ top: "always", horizontal: "never" }}
  >
    <Block flex={0.05} style={styles.header}>
      <Image styles={styles.logo} source={Images.GriddleLogo} />
    </Block>
    <Block flex>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <DrawerItems {...props} />
        <Block middle>
          <Button
            color="secondary"
            style={styles.createButton}
            onPress={() => {
              //console.log(props);
              props.navigation.navigate("Onboarding", { reset: true });
            }}
          >
            <Text bold size={14} color={argonTheme.COLORS.WHITE}>
              Reset
            </Text>
          </Button>
        </Block>
      </ScrollView>
      <Block middle style={{ position: "absolute", bottom: 0 }}>
        <Button
          color="primary"
          style={styles.createButton}
          onPress={() => {
            //console.log(props);
            props.navigation.navigate("Onboarding", { logoff: true });
          }}
        >
          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
            Logoff
          </Text>
        </Button>
      </Block>
    </Block>
  </Block>
);

const Menu = {
  contentComponent: props => <Drawer {...props} />,
  unmountInactiveRoutes: true,
  drawerBackgroundColor: "white",
  drawerWidth: width * 0.8,
  contentOptions: {
    activeTintColor: "white",
    inactiveTintColor: "#000",
    activeBackgroundColor: "transparent",
    itemStyle: {
      width: width * 0.75,
      backgroundColor: "transparent"
    },
    labelStyle: {
      fontSize: 18,
      marginLeft: 12,
      fontWeight: "normal"
    },
    itemsContainerStyle: {
      paddingVertical: 16,
      paddingHorizonal: 12,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      overflow: "hidden"
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  createButton: {
    width: width * 0.8,
    marginTop: 25,
    backgroundColor: "#b4b4b4",
    color: "#000"
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center"
  }
});

export default Menu;
