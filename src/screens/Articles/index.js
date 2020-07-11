import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import Gestures from "react-native-easy-gestures";
import Header from "./components/header";
import Image from "./components/image";
import Comments from "./components/comments";
import { Block } from "galio-framework";
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateDistance from "../../helpers/dateDistance";

import { Container, Content, Author, Background, Title } from "./styles";

import AbuseModal from "../../components/AbuseModal";
import BlockModal from "../../components/BlockModal";

import FloatIcon from "./components/FloatIcon";
import { useSelector } from "react-redux";

function Articles() {
  const route = useRoute();
  const item = route.params.item;
  const gestures = useRef(null);
  const [visible, setVisible] = useState(false);
  const [blockModal, setBlockModal] = useState(false);
  const [icons, setIcons] = useState([]);
  const user_id = useSelector((state) => state.user.data.id);

  useEffect(() => {
    handleVotes();
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const closeBlockModal = useCallback(() => {
    setBlockModal(false);
  }, []);

  const getRandomNumber = useCallback((min, max) => {
    return Math.random() * (max - min) + min;
  }, []);

  const handleVotes = useCallback(() => {
    if (item.vote.length > 0) {
      const array = item.vote.map((vt) => ({ id: vt.id, name: vt.type_vote }));
      setIcons(array);
    } else {
      setIcons([]);
    }
  }, []);

  const renderEmots = useCallback(() => {
    return (
      <React.Fragment>
        {icons.map((icon) => (
          <FloatIcon
            name={icon.name}
            key={icon.id}
            right={getRandomNumber(20, 80)}
            delay={getRandomNumber(0, 2500)}
            onComplete={() => {}}
          />
        ))}
      </React.Fragment>
    );
  }, [icons]);

  const title = useMemo(() => (!!item.title ? item.title : item.name), [
    item.title,
    item.name,
  ]);
  const time = useMemo(() => (!!item.time ? item.time : item.createdAt), [
    item.time,
    item.createdAt,
  ]);

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
                {!!title && !!title.trim() ? (
                  <Block row>
                    <Title numberOfLines={1}>{`#${title.trim()}`}</Title>
                    <Title>
                      {"     "}
                      {DateDistance(new Date(time))}
                    </Title>
                  </Block>
                ) : (
                  <Title>{DateDistance(new Date(item.time))}</Title>
                )}
              </Block>
              {user_id !== item.user_id && (
                <Block row>
                  <TouchableOpacity
                    onPress={() => setVisible(true)}
                    style={{
                      padding: 5,
                      borderRadius: 20,
                    }}
                  >
                    <Feather name="more-vertical" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setBlockModal(true)}
                    style={{
                      padding: 5,
                      borderRadius: 20,
                    }}
                  >
                    <MaterialIcons name="block" size={20} />
                  </TouchableOpacity>
                </Block>
              )}
            </Block>

            <Comments id={item.picture_id} />
          </KeyboardAwareScrollView>
        </Content>

        <AbuseModal visible={visible} close={close} />
        <BlockModal visible={blockModal} close={closeBlockModal} />
      </Container>
    </Background>
  );
}

Articles.navigationOptions = {
  header: null,
};

export default Articles;
