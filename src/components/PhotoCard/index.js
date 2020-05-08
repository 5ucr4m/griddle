import React, { useState, memo } from "react";
import { StyleSheet, Image as ImageIcon } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Block } from "galio-framework";
import { Dimensions, Text, ActivityIndicator } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { EvilIcons, Feather } from "@expo/vector-icons";
import formatDistanceToNow from "../../helpers/dateDistance";

import winner_icon from "../../../assets/icons/category_winner.png";

import CustomIcon from "./CustomIcon";

import { votePicture } from "../../store/modules/pictures/actions";
import reverse from "../../helpers/arrayReverse";

import {
  Container,
  Title,
  Author,
  IconsWrapper,
  Divider,
  Emots,
  Comments,
} from "./styles";

import { TouchableOpacity } from "react-native-gesture-handler";
import pictureService from "../../service/pictures";

const { width } = Dimensions.get("window");

function Card({ image, onPress, winner = false, category = "" }) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.data.username);
  const user_id = useSelector((state) => state.user.data.id);
  const { uri, title, user, vote } = image;
  const [showEmots, setShowEmots] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = [
    "eyes_vote",
    "smile_vote",
    "hair_vote",
    "muscle_vote",
    "body_vote",
    "crazy_vote",
  ];

  function changeWinnerName(type) {
    return type
      .replace("eyes_vote", "Winner best eyes")
      .replace("smile_vote", "Winner best smile")
      .replace("hair_vote", "Winner best hair")
      .replace("muscle_vote", "Winner best muscles")
      .replace("body_vote", "Winner best figure")
      .replace("crazy_vote", "Winner best funny");
  }

  async function handleVote(type) {
    if (image.vote.find((item) => item.user_id === user_id)) {
      return;
    }

    setLoading(true);
    setShowEmots(false);
    const vote = await pictureService.addVotes(image.picture_id, type, user_id);
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
          style={{ width: 40, paddingVertical: 5 }}
        />
      );
    }

    if (!!finded || vote.length > 0) {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowEmots(!showEmots)}
          style={[styles.icon]}
        >
          {vote.slice(0, 5).map((vt) => (
            <CustomIcon
              key={vt.id}
              type={vt.type_vote}
              style={{ width: 24, height: 24, marginRight: 5 }}
            />
          ))}
          <Comments>{vote.length}</Comments>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setShowEmots(!showEmots)}
        style={{ width: 40, paddingVertical: 5, height: 40 }}
      >
        <EvilIcons name="pointer" size={35} color="#333" />
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
          <Block row style={{ marginHorizontal: 10, alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => setShowEmots(!showEmots)}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="chevron-down" size={26} />
            </TouchableOpacity>

            {categories.map((category, index) => (
              <TouchableOpacity
                key={category + index}
                onPress={() => handleVote(category)}
                style={styles.icon}
              >
                <CustomIcon type={category} />
              </TouchableOpacity>
            ))}
            <Text style={{ flex: 1, textAlign: "center" }}>Click to vote!</Text>
          </Block>
          <Divider />
          <Text style={{ marginHorizontal: 20, marginBottom: 10 }}>
            Who's Voted
          </Text>
          {reverse(vote).map((item, index) => (
            <Block
              key={String(index)}
              row
              style={{
                marginLeft: 20,
                marginVertical: 3,
                alignItems: "center",
              }}
            >
              <CustomIcon
                type={item.type_vote}
                style={{ width: 16, height: 16, marginRight: 7 }}
              />

              <Text>@{item.user.username}</Text>
              <Text style={{ marginLeft: 10 }}>
                {formatDistanceToNow(new Date(item.createdAt))}
              </Text>
            </Block>
          ))}
        </IconsWrapper>
      )}
      <Block row>
        <Block flex>
          <Block Block flex style={{ paddingTop: 15, paddingHorizontal: 20 }}>
            <Author>@{user.username}</Author>
            <Title>
              {!!title.trim() && `#${title.trim()}`}
              {"     "}
              {formatDistanceToNow(new Date(image.time))}
            </Title>
          </Block>
          <Block
            Block
            flex
            row
            style={{
              paddingHorizontal: 20,
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            {choseIconVote()}
            <Emots>
              {!!image.comment.length && (
                <>
                  <Block style={{ height: 30, marginLeft: 20 }}>
                    <Feather name="message-circle" size={28} color="#6D4FB2" />
                  </Block>
                  <Comments>{image.comment.length}</Comments>
                </>
              )}
            </Emots>
          </Block>
        </Block>
        {winner && (
          <Block
            style={{
              width: 100,
              height: 110,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomIcon type="winner_icon" style={{ width: 40, height: 40 }} />
            <Text style={{ marginTop: 10, textAlign: "center" }}>
              {changeWinnerName(winner.type)}
            </Text>
          </Block>
        )}
      </Block>
    </Container>
  );
}

const styles = StyleSheet.create({
  icon: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default memo(Card);
