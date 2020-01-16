import React, { useEffect, useRef } from "react";
import Gestures from "react-native-easy-gestures";

import Header from "./components/header";
import Image from "./components/image";
import Comments from "./components/comments";
import Votes from "./components/votes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Container, Content, ItemsContent, Author } from "./styles";

import { articles } from "../../constants";

function Articles({ navigation }) {
  const item = navigation.getParam("item");
  const gestures = useRef(null);
  useEffect(() => {
    (!item || !articles[item.id]) && navigation.navigate("Home");
  }, []);

  console.log(item);

  return (
    <Container>
      <Header>{item.title}</Header>
      <Content>
        <KeyboardAwareScrollView
          enableAutomaticScroll={true}
          enableOnAndroid={true}
          extraScrollHeight={50}
        >
          <Gestures
            style={{ zIndex: 5 }}
            ref={gestures}
            draggable={true}
            rotatable={false}
            scalable={{
              min: 0.8,
              max: 3
            }}
            onEnd={(event, styles) => {
              console.log(gestures);
              gestures.current.reset(prevStyles => {
                console.log(prevStyles);
              });
            }}
          >
            <Image source={item.image}></Image>
          </Gestures>
          <Author>@{item.user.username}</Author>
          <ItemsContent
            horizontal={true}
            howsHorizontalScrollIndicator={true}
            pagingEnabled={true}
            decelerationRate={0}
            scrollEventThrottle={16}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
          >
            <Comments id={item.picture_id} />
            <Votes id={item.picture_id} />
          </ItemsContent>
        </KeyboardAwareScrollView>
      </Content>
    </Container>
  );
}

Articles.navigationOptions = {
  header: null
};

export default Articles;
