import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";

import { Block, Button, theme } from "galio-framework";
import argonTheme from "../../constants/Theme";
import Images from "../../constants/Images";
import Logo from "../../../assets/imgs/NewLogo.png";

const { height, width } = Dimensions.get("screen");

function Home() {
  const navigation = useNavigation();

  return (
    <Block flex style={styles.container}>
      <StatusBar hidden />
      <Block flex center>
        <ImageBackground
          source={Images.Onboarding}
          style={{ height, width, zIndex: 1 }}
        />
      </Block>
      <Block center>
        <Image source={Logo} style={styles.logo} />
      </Block>
      <Block flex space="between" style={[styles.padded]}>
        <Block
          flex
          space="around"
          style={{
            zIndex: 2,
          }}
        >
          <Block style={styles.title}>
            <Block center>
              <Button
                style={styles.button}
                color={argonTheme.COLORS.SECONDARY}
                onPress={() => navigation.navigate("Login")}
                textStyle={{ color: argonTheme.COLORS.BLACK }}
              >
                Login
              </Button>
              <Block style={styles.subTitle}>
                <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
                  <Text style={{ color: "#FFFFAA", fontSize: 14 }}>
                    Forgot user name/Password?
                  </Text>
                </TouchableOpacity>
              </Block>
            </Block>
          </Block>
          <Block center style={{ flex: 1, flexDirection: "row" }}>
            <Button
              style={styles.button}
              color={argonTheme.COLORS.SECONDARY}
              onPress={() => navigation.navigate("Register")}
              textStyle={{ color: argonTheme.COLORS.BLACK }}
            >
              Sign Up
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 1,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  logo: {
    width: 80,
    height: 80,
    zIndex: 2,
    position: "relative",
    marginTop: "-50%",
  },
  title: {
    marginTop: "-5%",
  },
  subTitle: {
    marginTop: 20,
  },
});

export default Home;
