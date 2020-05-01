import React, { useState, useEffect, memo } from "react";
import { Animated, StyleSheet, Image } from "react-native";

import cute_vote from "../../../../../assets/icons/cute_vote64.png";
import crazy_vote from "../../../../../assets/icons/crazy_vote64.png";
import funny_vote from "../../../../../assets/icons/funny_vote64.png";
import smile_vote from "../../../../../assets/icons/smile_vote64.png";
import hair_vote from "../../../../../assets/icons/hair_vote64.png";

function FloatIcon({ right, name, delay, onComplete }) {
  const [yAnimation] = useState(new Animated.Value(0));

  function iconUp() {
    return {
      transform: [
        {
          translateY: yAnimation.interpolate({
            inputRange: [0, 350],
            outputRange: [350, 100],
          }),
        },
        {
          scale: yAnimation.interpolate({
            inputRange: [0, 15, 30, 350],
            outputRange: [0, 1.4, 1, 0.5],
            extrapolate: "clamp",
          }),
        },
      ],
    };
  }

  useEffect(() => {
    Animated.timing(yAnimation, {
      toValue: 350,
      duration: 1500,
      delay: delay,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        iconUp(),
        {
          right: right,
          opacity: yAnimation.interpolate({
            inputRange: [0, 350],
            outputRange: [1, 0],
          }),
        },
      ]}
    >
      {name === "cute_vote" && (
        <Image
          source={cute_vote}
          resizeMode="cover"
          style={{ width: 30, height: 30, marginRight: 15 }}
        />
      )}
      {name === "crazy_vote" && (
        <Image
          source={crazy_vote}
          resizeMode="cover"
          style={{ width: 30, height: 30, marginRight: 15 }}
        />
      )}
      {name === "funny_vote" && (
        <Image
          source={funny_vote}
          resizeMode="cover"
          style={{ width: 30, height: 30, marginRight: 15 }}
        />
      )}
      {name === "smile_vote" && (
        <Image
          source={smile_vote}
          resizeMode="cover"
          style={{ width: 30, height: 30, marginRight: 15 }}
        />
      )}
      {name === "hair_vote" && (
        <Image
          source={hair_vote}
          resizeMode="cover"
          style={{ width: 30, height: 30, marginRight: 15 }}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    zIndex: 10,
  },
});

FloatIcon.defaultProps = {
  right: 20,
  delay: 0,
  onComplete: () => {},
};

export default memo(FloatIcon);
