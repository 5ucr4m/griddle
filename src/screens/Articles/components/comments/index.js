import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Block } from "galio-framework";
import dateDistance from "../../../../helpers/dateDistance";

import pitureService from "../../../../service/pictures";
import pictureActions from "../../../../store/modules/pictures/actions";

import {
  Container,
  Title,
  Count,
  InputContainer,
  Input,
  Button,
  CommentContainer,
  Comment,
  CommentUser,
  ActivityIndicator,
} from "./styles";

export default function Comments({ id }) {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.session.user_id);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  async function loadComments() {
    const data = await pitureService.getComments(id);
    setComments(data);
  }

  useEffect(() => {
    loadComments();
  }, []);

  async function handleSubmitComment() {
    setLoading(true);
    if (comment.trim().length > 3 && !loading) {
      await pitureService.addComment(id, comment.trim(), user_id);
      await loadComments();
      setComment("");
      setLoading(false);
    } else {
      Alert.alert("Comments must be longer than 3 characters");
      setLoading(false);
    }
    dispatch(pictureActions.loading());
  }

  return (
    <Container>
      <Title>Comments</Title>
      <InputContainer>
        <Input
          placeholder="comment..."
          autoCapitalize="none"
          value={comment}
          onChangeText={(text) => setComment(text)}
        ></Input>
        <Block style={{ width: 60, alignItems: "center" }}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button onPress={() => handleSubmitComment()}>
              <Feather
                name="send"
                size={20}
                color="#999"
                style={{ marginHorizontal: 10 }}
              ></Feather>
            </Button>
          )}
        </Block>
      </InputContainer>
      {!!comments.total && <Count>{comments.total} comments</Count>}
      {!!comments.docs &&
        comments.docs.map((comment) => (
          <CommentContainer key={comment.id}>
            <Comment>
              <CommentUser>@{comment.user.username}: </CommentUser>
              {comment.description}
              {` - ${dateDistance(new Date(comment.createdAt))}`}
            </Comment>
          </CommentContainer>
        ))}
    </Container>
  );
}
