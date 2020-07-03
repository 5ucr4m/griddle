import React, { useEffect, useState, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { Animated, View, Text } from "react-native";
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

  const votesWinners = useMemo(() => {
    const allVotes = images
      .filter((image) => !!image.vote.length)
      .map((image) => {
        return {
          id: image.picture_id,
          votes: image.vote.reduce((objReduce, vote) => {
            if (!!objReduce[vote.type_vote]) {
              return {
                ...objReduce,
                [vote.type_vote]: objReduce[vote.type_vote] + 1,
              };
            }

            return { ...objReduce, [vote.type_vote]: 1 };
          }, {}),
        };
      });

    const winners = allVotes.reduce((objReduce, item) => {
      const { id, votes } = item;
      let newObjReduce = { ...objReduce };

      Object.keys(votes).forEach((type) => {
        if (!!objReduce[type]) {
          if (newObjReduce[type].quantity < votes[type]) {
            newObjReduce[type] = {
              id,
              type,
              quantity: votes[type],
            };
          }

          if (
            newObjReduce[type].quantity === votes[type] &&
            newObjReduce[type].id > id
          ) {
            newObjReduce[type] = {
              id,
              type,
              quantity: votes[type],
            };
          }
        } else {
          newObjReduce = {
            ...newObjReduce,
            [type]: {
              id,
              type,
              quantity: votes[type],
            },
          };
        }
      });
      return newObjReduce;
    }, {});

    return Object.values(winners);
  }, [images]);

  function renderPost(item) {
    navigation.navigate("Articles", {
      item: item,
      user_id: 123,
    });
  }

  if (!images) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#999", fontSize: 20 }}>
          No images to display!!
        </Text>
      </View>
    );
  }

  return (
    <>
      <Container
        scrollEventThrottle={16}
        onScroll={(evt) => {
          Animated.event([
            {
              nativeEvent: {
                contentOffset: { y: scrollOffset },
              },
            },
          ])(evt);
        }}
      >
        {images.map((image, index) => (
          <PhotoCard
            key={image.image}
            onPress={() => renderPost(image)}
            image={image}
            winner={votesWinners.find((item) => image.picture_id === item.id)}
          />
        ))}
      </Container>
    </>
  );
}

export default Mansory;
