import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import api from "../service/api";

import {
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";

import { Block, Text, theme } from "galio-framework";

import { argonTheme } from "../constants";
import Button from "./Button";
import Input from "./Input";

function Card({ item, horizontal, full, ctaColor, imageStyle, handleTouch }) {
  const [title, setTitle] = useState("");
  const [posting, setPosting] = useState(false);
  const user_id = useSelector((state) => state.session.user_id);
  const token = useSelector((state) => state.session.token);

  function renderEmptyCard(horizontal, cardContainer) {
    return <Block row={horizontal} card flex style={cardContainer}></Block>;
  }

  function renderOptions(item) {
    const navigation = useNavigation();
    return (
      <Block flex space="between" style={styles.cardDescription}>
        <Input
          borderless
          placeholder="Selfie Title"
          onChangeText={(input_title) => setTitle(input_title)}
          value={title}
        />
        <Block
          middle
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Button
            small
            disabled={posting}
            style={{ backgroundColor: "#5E72E4" }}
            onPress={() => {
              savePicture(title, item.base64, item);
            }}
          >
            <Text>Post</Text>
          </Button>

          <Button
            small
            style={{ backgroundColor: "#F7FAFC" }}
            onPress={() => {
              navigation.navigate("Main");
            }}
          >
            <Text>Cancel</Text>
          </Button>
        </Block>
      </Block>
    );
  }

  savePicture = (title, base64, item) => {
    setPosting(true);
    item.image = "http://67.227.214.144/~webgriddle/img/spinner.gif";

    const body = {
      name: title,
      user_id: user_id,
      image_base64: base64,
    };

    fetch("http://67.227.214.144:3010/pictures", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ ...body }),
    })
      .then((res) => res.json())
      .then((res) => {
        navigation.navigate("Home");
      })
      .catch((error) => {});
  };

  const imageStyles = [
    full
      ? styles.fullImage
      : double
      ? { height: 256 * 1.5, width: 144 * 1.5 }
      : styles.horizontalImage,
    imageStyle,
  ];
  const cardContainer = [styles.card, styles.shadow, style];
  const imgContainer = [
    styles.imageContainer,
    horizontal ? styles.horizontalStyles : styles.verticalStyles,
    styles.shadow,
  ];

  return (
    <Block row={horizontal} card flex style={cardContainer}>
      <TouchableWithoutFeedback onPress={() => handleTouch(item)}>
        <Block flex style={imgContainer}>
          <ImageBackground
            source={{ uri: item.image }}
            style={imageStyles}
            resizeMode="cover"
          ></ImageBackground>
        </Block>
      </TouchableWithoutFeedback>
      {!options && (
        <TouchableWithoutFeedback onPress={() => {}}>
          <Block flex space="between" style={styles.cardDescription}>
            <Text size={14} style={styles.cardTitle}>
              {item.title.length >= 10
                ? item.title.substr(0, 10) + "..."
                : item.title}
            </Text>
            <Text
              size={12}
              muted={!ctaColor}
              color={ctaColor || argonTheme.COLORS.ACTIVE}
              bold
            >
              {item.cta.length >= 10
                ? item.cta.substr(0, 10) + "..."
                : item.cta}
            </Text>
          </Block>
        </TouchableWithoutFeedback>
      )}
      {options && renderOptions(item)}
    </Block>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginLeft: 8,
    marginRight: 8,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 10,
  },
  cardTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: "hidden",
  },
  image: {},
  horizontalImage: {
    height: 256,
    width: 144,
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 315,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
};

Card.defaultProps = {
  handleTouch: () => {},
};

export default Card;
