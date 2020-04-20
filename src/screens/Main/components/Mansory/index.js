import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Animated } from "react-native";
import { Container } from "./styles";
import PhotoCard from "../../../../components/PhotoCard";

function Mansory({ images, scrollOffset }) {
  const navigation = useNavigation();
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 50 }));

  useEffect(() => {
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 4,
      bounciness: 20,
    }).start();
  }, []);

  function renderPost(item) {
    navigation.navigate("Articles", {
      item: item,
      user_id: 123,
    });
  }

  return (
    <>
      <Container
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { y: scrollOffset },
            },
          },
        ])}
      >
        {images.map((image, index) => (
          <PhotoCard
            key={image.image}
            onPress={() => renderPost(image)}
            image={image}
          />
        ))}
      </Container>
    </>
  );
}

export default Mansory;
