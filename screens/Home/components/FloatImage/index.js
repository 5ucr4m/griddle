import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Animated, Dimensions } from "react-native";
import { removeFirstTime } from "../../../../store/modules/session/actions";
import { formatDistanceToNow } from "date-fns";

import {
  Container,
  Content,
  Image,
  Background,
  Blur,
  User,
  Title,
  Comments,
  Info
} from "./styles";

const Screen = Dimensions.get("screen");

function FloatImage({ image, visible = false, setVisible }) {
  const dispatch = useDispatch();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [width] = useState(new Animated.Value(10));
  const [height] = useState(new Animated.Value(10));
  const [positionX] = useState(new Animated.Value(0));
  const [positionY] = useState(new Animated.Value(0));

  function handleOpen() {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500
      }),

      Animated.timing(width, {
        toValue: Screen.width * 0.7,
        duration: 200
      }),

      Animated.timing(height, {
        toValue: Screen.height * 0.35,
        duration: 200
      }),

      Animated.timing(positionX, {
        toValue: Screen.height * (0.25 / 2),
        duration: 200
      }),

      Animated.timing(positionY, {
        toValue: Screen.width * 0.15,
        duration: 200
      })
    ]).start();
  }

  function handleClose() {
    Animated.timing(width, {
      toValue: Screen.width * 0.48,
      duration: 300
    }).start();

    Animated.timing(height, {
      toValue: 180,
      duration: 300
    }).start();

    Animated.timing(positionX, {
      toValue: 3,
      duration: 300
    }).start();

    Animated.timing(positionY, {
      toValue: 3,
      duration: 300
    }).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300
    }).start();

    setTimeout(() => {
      setVisible(false);
      dispatch(removeFirstTime());
    }, 300);
  }

  return visible && !!image ? (
    <Container
      style={{
        opacity: fadeAnim
      }}
    >
      <Content onPress={() => handleClose()} />
      <Blur intensity={75} tint="dark">
        <Animated.View
          style={{ width, height, top: positionX, left: positionY }}
        >
          <Image
            resizeMode="cover"
            onLoadEnd={handleOpen}
            source={{
              uri: image.uri
            }}
          />
          <Info>
            <User>@{image.user.username}</User>
            <Title>{image.title.substr(0, 15)}</Title>
            <Comments>{image.comment.length} Comments</Comments>
            <Comments>
              {formatDistanceToNow(new Date(image.time.substr(0, 19)))}
            </Comments>
          </Info>
        </Animated.View>
      </Blur>
      <Background />
    </Container>
  ) : null;
}

export default FloatImage;
