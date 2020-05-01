import React, { useState, memo } from "react";
import { StyleSheet, Image as ImageIcon } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Block } from "galio-framework";
import { Dimensions, Text, ActivityIndicator } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { EvilIcons, Feather } from "@expo/vector-icons";
import formatDistanceToNow from "../../helpers/dateDistance";

import cute_vote from "../../../assets/icons/cute_vote64.png";
import crazy_vote from "../../../assets/icons/crazy_vote64.png";
import funny_vote from "../../../assets/icons/funny_vote64.png";
import smile_vote from "../../../assets/icons/smile_vote64.png";
import hair_vote from "../../../assets/icons/hair_vote64.png";
import winner_icon from "../../../assets/icons/category_winner.png";

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

    function icons(vt) {
      if (vt.type_vote === "cute_vote")
        return (
          <ImageIcon
            key={vt.id.toString()}
            source={cute_vote}
            resizeMode="cover"
            style={{ width: 24, height: 24, marginRight: 5 }}
          />
        );

      if (vt.type_vote === "crazy_vote")
        return (
          <ImageIcon
            key={vt.id.toString()}
            source={crazy_vote}
            resizeMode="cover"
            style={{ width: 24, height: 24, marginRight: 5 }}
          />
        );

      if (vt.type_vote === "funny_vote")
        return (
          <ImageIcon
            key={vt.id.toString()}
            source={funny_vote}
            resizeMode="cover"
            style={{ width: 24, height: 24, marginRight: 5 }}
          />
        );

      if (vt.type_vote === "smile_vote")
        return (
          <ImageIcon
            key={vt.id.toString()}
            source={smile_vote}
            resizeMode="cover"
            style={{ width: 24, height: 24, marginRight: 5 }}
          />
        );

      if (vt.type_vote === "hair_vote")
        return (
          <ImageIcon
            key={vt.id.toString()}
            source={hair_vote}
            resizeMode="cover"
            style={{ width: 24, height: 24, marginRight: 5 }}
          />
        );
    }

    if (!!finded) {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowEmots(!showEmots)}
          style={[styles.icon]}
        >
          {vote.slice(0, 5).map((vt) => icons(vt))}
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
            <TouchableOpacity
              onPress={() => handleVote("funny_vote")}
              style={styles.icon}
            >
              <ImageIcon
                source={funny_vote}
                resizeMode="cover"
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleVote("crazy_vote")}
              style={styles.icon}
            >
              <ImageIcon
                source={crazy_vote}
                resizeMode="cover"
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleVote("hair_vote")}
              style={styles.icon}
            >
              <ImageIcon
                source={hair_vote}
                resizeMode="cover"
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleVote("smile_vote")}
              style={styles.icon}
            >
              <ImageIcon
                source={smile_vote}
                resizeMode="cover"
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleVote("cute_vote")}
              style={styles.icon}
            >
              <ImageIcon
                source={cute_vote}
                resizeMode="cover"
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
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
              {item.type_vote === "cute_vote" && (
                <ImageIcon
                  source={cute_vote}
                  resizeMode="cover"
                  style={{ width: 16, height: 16, marginRight: 7 }}
                />
              )}
              {item.type_vote === "crazy_vote" && (
                <ImageIcon
                  source={crazy_vote}
                  resizeMode="cover"
                  style={{ width: 16, height: 16, marginRight: 7 }}
                />
              )}
              {item.type_vote === "funny_vote" && (
                <ImageIcon
                  source={funny_vote}
                  resizeMode="cover"
                  style={{ width: 16, height: 16, marginRight: 7 }}
                />
              )}
              {item.type_vote === "smile_vote" && (
                <ImageIcon
                  source={smile_vote}
                  resizeMode="cover"
                  style={{ width: 16, height: 16, marginRight: 7 }}
                />
              )}
              {item.type_vote === "hair_vote" && (
                <ImageIcon
                  source={hair_vote}
                  resizeMode="cover"
                  style={{ width: 16, height: 16, marginRight: 7 }}
                />
              )}
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
            <Title>{!!title.trim() && `#${title.trim()}`}</Title>
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
                  <Block style={{ height: 30, marginLeft: 30 }}>
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
            <ImageIcon
              source={winner_icon}
              resizeMode="cover"
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ marginTop: 10 }}>
              {winner.type.replace("_", " ")}
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
