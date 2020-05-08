import React, { useState, useRef, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Gestures from "react-native-easy-gestures";
import Header from "./components/header";
import Image from "./components/image";
import Comments from "./components/comments";
import { Block } from "galio-framework";
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateDistance from "../../helpers/dateDistance";

import { Container, Content, Author, Abuse, Background, Title } from "./styles";
import AbuseModal from "../../components/AbuseModal";

import FloatIcon from "./components/FloatIcon";

function Articles() {
  const route = useRoute();
  const item = route.params.item;
  const gestures = useRef(null);
  const [visible, setVisible] = useState(false);
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    handleVotes();
  }, []);

  function close() {
    setVisible(false);
  }

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  function handleVotes() {
    if (item.vote.length > 0) {
      const array = item.vote.map((vt) => ({ id: vt.id, name: vt.type_vote }));
      setIcons(array);
    } else {
      setIcons([]);
    }
  }

  function renderEmots() {
    return (
      <>
        {icons.map((icon) => (
          <FloatIcon
            name={icon.name}
            key={icon.id}
            right={getRandomNumber(20, 80)}
            delay={getRandomNumber(0, 2500)}
            onComplete={() => {}}
          />
        ))}
      </>
    );
  }

  const title = !!item.title ? item.title : item.name;
  const time = !!item.time ? item.time : item.createdAt;

  return (
    <Background>
      <Container>
        <Header>{title}</Header>
        <Content>
          <KeyboardAwareScrollView
            enableAutomaticScroll={true}
            enableOnAndroid={true}
            extraScrollHeight={50}
          >
            <Gestures
              style={{ zIndex: 5 }}
              ref={gestures}
              draggable={false}
              rotatable={false}
              scalable={{
                min: 0.8,
                max: 3,
              }}
              onEnd={(event, styles) => {
                gestures.current.reset((prevStyles) => {});
              }}
            >
              <Image source={!!item.image ? item.image : item.path}></Image>
            </Gestures>

            {renderEmots()}

            <Block
              row
              style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 30 }}
            >
              <Block flex>
                <Author>@{item.user.username}</Author>
                {!!title.trim() ? (
                  <Block row>
                    <Title numberOfLines={1}>{`#${title.trim()}`}</Title>
                    <Title>
                      {"     "}
                      {DateDistance(new Date(time))}
                    </Title>
                  </Block>
                ) : (
                  <Title>DateDistance( new Date(item.time) )</Title>
                )}
              </Block>
              <Block flex>
                <TouchableOpacity onPress={() => setVisible(true)}>
                  <Abuse>report abuse</Abuse>
                </TouchableOpacity>
              </Block>
            </Block>

            <Comments id={item.picture_id} />
          </KeyboardAwareScrollView>
        </Content>

        <AbuseModal visible={visible} close={close} />
      </Container>
    </Background>
  );
}

Articles.navigationOptions = {
  header: null,
};

export default Articles;
