import React, { memo } from "react";
import { Image } from "react-native";
import { withNavigation } from "react-navigation";
import MasonryList from "react-native-masonry-list";
import { formatDistanceToNow } from "date-fns";

import emot1 from "../../../../assets/icons/emot1.png";
import emot2 from "../../../../assets/icons/emot2.png";
import emot3 from "../../../../assets/icons/emot3.png";

import { Block } from "galio-framework";

import { Container, User, Title, Comments, Emots } from "./styles";

function Galery({ navigation, images }) {
  function renderPost(item) {
    navigation.navigate("Articles", {
      item: item,
      user_id: 123
    });
  }

  function goToPerfilUser(item) {
    const user = {
      data: {
        id: item.user_id,
        username: item.user.username
      },
      profile: item.user.profile
    };

    navigation.navigate("GuestProfile", {
      refUser: user
    });
  }

  return (
    <Container>
      <MasonryList
        onPressImage={item => {
          renderPost(item);
          console.log(item);
        }}
        rerender={true}
        renderIndividualFooter={item => {
          const date = new Date(item.time.substr(0, 19));
          const distance = formatDistanceToNow(date);
          return (
            <Block Block flex style={{ paddingBottom: 15 }}>
              <User numberOfLines={1} onPress={() => goToPerfilUser(item)}>
                @{item.user.username}
              </User>
              {!!item.title.trim() && (
                <Title numberOfLines={1}>{item.title.substr(0, 15)}</Title>
              )}
              {!!item.comment.length && (
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
                  <Comments>{item.comment.length}</Comments>
                </Emots>
              )}
            </Block>
          );
        }}
        sorted={true}
        spacing={2}
        imageContainerStyle={{ borderRadius: 20 }}
        listContainerStyle={{ paddingBottom: 100 }}
        initialColToRender={2}
        initialNumInColsToRender={4}
        images={images}
      />
    </Container>
  );
}

export default withNavigation(memo(Galery));
