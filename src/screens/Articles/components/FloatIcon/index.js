import React, { useState, useEffect, memo } from "react";
import { Animated, StyleSheet } from "react-native";

import CustomIcon from "../../../../components/PhotoCard/CustomIcon";

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
      duration: 2000,
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
      <CustomIcon
        type={name}
        style={{ width: 30, height: 30, marginRight: 15 }}
      />
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
