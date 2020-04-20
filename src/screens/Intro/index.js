import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppIntroSlider from "react-native-app-intro-slider";
import Images from "../../constants/Images";
import * as SecureStore from "expo-secure-store";

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "transparent",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: 16,
  },
});

const slides = [
  {
    key: "intro1",
    title: "Griddle, power up your selfies",
    text:
      "Be a rockstar! Griddle is the brand new way to show the entire planet how pretty you are...",
    icon: "ios-planet",
    image: Images.LogoOnboarding,
    colors: ["#63E2FF", "#B066FE"],
  },
  {
    key: "intro2",
    title: "Griddle it!",
    text: "... or maybe how funny your selfies are.",
    icon: "ios-planet",
    image: Images.LogoOnboarding,
    colors: ["#A3A1FF", "#3A3897"],
  },
  {
    key: "intro3",
    title: "Oh but...",
    text: "Please, don't climb any wall to take your selfies..",
    icon: "ios-planet",
    image: Images.LogoOnboarding,
    colors: ["#29ABE2", "#4F00BC"],
  },
];

class Intro extends React.Component {
  _onDone = async () => {
    const { navigate } = this.props.navigation;
    await SecureStore.setItemAsync("griddle-first", "no");
    navigate("Home");
  };

  _renderItem = (props) => (
    <LinearGradient
      style={[
        styles.mainContent,
        {
          width: props.item.width,
          height: props.item.height,
        },
      ]}
      colors={props.item.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      <Image source={props.item.image} />
      <View>
        <Text style={styles.title}>{props.item.title}</Text>
        <Text style={styles.text}>{props.item.text}</Text>
      </View>
    </LinearGradient>
  );

  render() {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={this._renderItem}
        bottomButton
        onDone={this._onDone}
        doneLabel={"Let's griddle!"}
      />
    );
  }
}

export default Intro;
