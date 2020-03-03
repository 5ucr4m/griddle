import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Text
} from "react-native";

import { Block, Button, theme } from "galio-framework";
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
import * as SQLite from "expo-sqlite";

import userDB from "../service/sqlite/user";
import userAcessDB from "../service/sqlite/user_access";

import * as SessionActions from "../store/modules/session/actions";

const db = SQLite.openDatabase("griddledb.db");
const { height, width } = Dimensions.get("screen");

class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    if (navigation.getParam("logoff")) {
      userDB.deleteUser();
    }

    if (navigation.getParam("reset")) {
      userAcessDB.dropTable();
      userAcessDB.createTable();
      userDB.dropTable();
      userDB.createTable();
    }

    db.transaction(tx => {
      tx.executeSql("SELECT * FROM user;", [], (tx, results) => {
        var temp = [];

        for (let i = 0; i < results.rows.length; ++i) {
          dados = results.rows.item(i);
          const user = JSON.parse(dados.user);
          const { id, username } = user;
          this.props.addSession(id, dados.token, username, user);
          navigation.navigate("Home");
          return true;
        }
      });
    });

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
          <Image source={Images.LogoOnboarding} style={styles.logo} />
        </Block>
        <Block flex space="between" style={[styles.padded]}>
          <Block
            flex
            space="around"
            style={{
              zIndex: 2
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
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Forgot")}
                  >
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
                onPress={() => navigation.navigate("Account")}
                textStyle={{ color: argonTheme.COLORS.BLACK }}
              >
                Sign Up
              </Button>
              {/* <Button
                style={(styles.button, { width: "40%", marginRight: 20 })}
                color={argonTheme.COLORS.SECONDARY}
                onPress={() => navigation.navigate("Account")}
                textStyle={{ color: argonTheme.COLORS.BLACK }}
              >
                Sign Up
              </Button> */}
              {/* <Button
                style={(styles.button, { width: "40%" })}
                color={argonTheme.COLORS.SECONDARY}
                onPress={() => navigation.navigate("Home")}
                textStyle={{ color: argonTheme.COLORS.BLACK }}
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
              </Button> */}
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 1,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 5,
      height: 5
    }
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: "relative",
    marginTop: "-50%"
  },
  title: {
    marginTop: "-5%"
  },
  subTitle: {
    marginTop: 20
  }
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(SessionActions, dispatch);

export default connect(null, mapDispatchToProps)(Onboarding);
