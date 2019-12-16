import React from "react";
import { withNavigation } from "react-navigation";
import MasonryList from "react-native-masonry-list";
import { formatDistanceToNow } from "date-fns";

import { Block } from "galio-framework";

import { Container, User, Title, Comments } from "./styles";

function Galery({ navigation, images }) {
  function renderPost(item) {
    navigation.navigate("Articles", {
      item: item,
      user_id: 123
    });
  }

  return (
    <Container>
      <MasonryList
        onPressImage={item => {
          renderPost(item);
        }}
        rerender={true}
        renderIndividualFooter={item => {
          const date = new Date(item.time.substr(0, 19));
          const distance = formatDistanceToNow(date);
          return (
            <Block Block flex style={{ paddingBottom: 5 }}>
              <User>@{item.user.username}</User>
              <Title>{item.title.substr(0, 15)}</Title>
              <Comments>{item.comment.length} Comments</Comments>
              <Comments>{distance}</Comments>
            </Block>
          );
        }}
        sorted={true}
        imageContainerStyle={{ borderRadius: 6 }}
        listContainerStyle={{ paddingBottom: 100 }}
        initialColToRender={2}
        initialNumInColsToRender={4}
        images={images}
      />
    </Container>
  );
}

export default withNavigation(Galery);
