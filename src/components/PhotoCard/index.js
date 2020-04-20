import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Block } from "galio-framework";
import { Dimensions, Text, ActivityIndicator } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { EvilIcons } from "@expo/vector-icons";

import { votePicture } from "../../store/modules/pictures/actions";

import {
  Container,
  Title,
  Author,
  IconsWrapper,
  Divider,
  Emots,
  Comments,
} from "./styles";

import emot1 from "../../../assets/icons/emot1.png";
import emot2 from "../../../assets/icons/emot2.png";
import emot3 from "../../../assets/icons/emot3.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import pictureService from "../../service/pictures";

const { width } = Dimensions.get("window");

function Card({ image, onPress }) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.data.username);
  const { uri, title, user, vote } = image;
  const [showEmots, setShowEmots] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleVote(type) {
    setLoading(true);
    setShowEmots(false);
    const vote = await pictureService.addVotes(image.picture_id, type);
    dispatch(votePicture({ ...vote, user: { username } }));
    setLoading(false);
  }

  function choseIconVote() {
    const { vote } = image;
    const finded = vote.find((item) => item.user.username === username);

    if (loading) {
      return (
        <ActivityIndicator
          size={10}
          color="#000"
          style={{ width: 20, paddingVertical: 5 }}
        />
      );
    }

    if (!!finded) {
      const iconType = !!finded.type_vote ? finded.type_vote : "like";
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowEmots(!showEmots)}
          style={{ width: 40, paddingVertical: 5 }}
        >
          <EvilIcons
            name={iconType}
            size={20}
            style={{ width: 40, paddingVertical: 5 }}
          />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setShowEmots(!showEmots)}
        style={{ width: 40, paddingVertical: 5 }}
      >
        <EvilIcons name="pointer" size={25} color="#333" />
      </TouchableOpacity>
    );
  }

  return (
    <Container>
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <Image uri={uri} style={{ width, height: width, marginRight: 3 }} />
      </TouchableOpacity>
      {showEmots && (
        <IconsWrapper>
          <Block row style={{ marginLeft: 20 }}>
            <TouchableOpacity onPress={() => handleVote("heart")}>
              <EvilIcons name="heart" size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleVote("bell")}>
              <EvilIcons name="bell" size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleVote("star")}>
              <EvilIcons name="star" size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleVote("like")}>
              <EvilIcons name="like" size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleVote("check")}>
              <EvilIcons name="check" size={20} />
            </TouchableOpacity>
            <Text style={{ marginLeft: 20 }}>Click to vote!</Text>
          </Block>
          <Divider />
          <Text style={{ marginHorizontal: 20 }}>Who's Votted</Text>
          {vote.slice(0, 3).map((item, index) => (
            <Block
              key={String(index)}
              row
              style={{ marginHorizontal: 20, marginVertical: 8 }}
            >
              <EvilIcons
                name={item.type_vote}
                size={20}
                style={{ marginRight: 10 }}
              />
              <Text>@{item.user.username}</Text>
            </Block>
          ))}
        </IconsWrapper>
      )}
      <Block Block flex style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
        <Author>@{user.username}</Author>
        {!!title.trim() && <Title>#{title.trim()}</Title>}
      </Block>
      <Block Block flex style={{ paddingHorizontal: 20 }}>
        {choseIconVote()}
        {!!image.comment.length && (
          <Emots>
            <Image
              source={emot1}
              style={{ width: 15, height: 15, marginRight: 3 }}
              resizeMode="cover"
            />
            <Image
              source={emot2}
              style={{ width: 15, height: 15, marginRight: 3 }}
              resizeMode="cover"
            />
            <Image
              source={emot3}
              style={{ width: 15, height: 15, marginRight: 3 }}
              resizeMode="cover"
            />
            <Comments>{image.comment.length}</Comments>
          </Emots>
        )}
      </Block>
    </Container>
  );
}

export default Card;
