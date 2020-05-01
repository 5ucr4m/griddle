import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar, ActivityIndicator, FlatList } from "react-native";
import api from "../../service/api";
import Modal from "react-native-modalbox";
import { Block, Text } from "galio-framework";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import reverse from "../../helpers/arrayReverse";

import {
  Container,
  ImageBackground,
  ProfileContainer,
  Image,
  TouchableOpacity,
  ButtonIcon,
  ProfileName,
  Loading,
  SelfiesTitle,
  PhotoContainer,
} from "./styles";

import { Button } from "../../components";
import { Images, argonTheme } from "../../constants";
import userService from "../../service/user";
import * as userActions from "../../store/modules/user/actions";
import * as sessionActions from "../../store/modules/session/actions";

function Profile({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [loadingSelfies, setLoadingSelfies] = useState(true);
  const [selfies, setSelfies] = useState([]);
  const [comments, setComments] = useState({ total: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const modal = useRef();
  let { picture } = user.profile;

  useEffect(() => {
    setLoadingSelfies(true);
    async function load() {
      const { data } = await api.get(`/users/${user.data.id}/pictures`);
      const { data: total } = await api.get(`/users/${user.data.id}/comments`);
      setComments(total);
      setSelfies(data);
      setLoadingSelfies(false);
    }
    load();
  }, []);

  function cleanUp() {
    dispatch(sessionActions.logout());
  }

  async function handleChangeAvatarGalery() {
    setIsOpen(false);

    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!!image.cancelled) return;

    picture = image.uri;
    setLoading(true);
    const resp = await userService.updateAvatar(image, user.profile.id);

    if (!!resp.data) {
      dispatch(userActions.updateProfile(resp.data));
    }
  }

  async function handleChangeAvatarCamera() {
    setIsOpen(false);
    const image = await ImagePicker.launchCameraAsync({ allowsEditing: true });

    if (!!image.cancelled) return;

    picture = image.uri;
    setLoading(true);
    const resp = await userService.updateAvatar(image, user.profile.id);

    if (!!resp.data) {
      dispatch(userActions.updateProfile(resp.data));
    }
  }

  async function modeSelect() {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const filesPermission = await ImagePicker.requestCameraRollPermissionsAsync();

    if (cameraPermission.status === "denied") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    if (filesPermission.status === "denied") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    setIsOpen(true);
  }

  function navigate(item) {
    navigation.navigate("Articles", {
      item: item,
      user_id: user.data.id,
    });
  }

  return (
    <Container>
      <StatusBar hidden />
      <ImageBackground source={Images.RegisterBackground}>
        <ProfileContainer>
          <TouchableOpacity onPress={modeSelect}>
            {loading && (
              <Loading>
                <ActivityIndicator size="large" color="#000" />
              </Loading>
            )}
            <Image
              resizeMode="cover"
              onLoadEnd={() => setLoading(false)}
              source={{
                uri: !!picture ? picture : Images.ProfilePicture,
              }}
            />
          </TouchableOpacity>
          <Block middle style={{ marginVertical: 20 }}>
            <Button
              small
              style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
              onPress={() => cleanUp()}
            >
              LOGOFF
            </Button>
            <Block row space="between" style={{ marginVertical: 20 }}>
              <Block middle flex={1}>
                {loadingSelfies ? (
                  <ActivityIndicator />
                ) : (
                  <Text
                    bold
                    size={12}
                    color="#525F7F"
                    style={{ marginBottom: 4 }}
                  >
                    0
                  </Text>
                )}

                <Text size={12}>Friends</Text>
              </Block>
              <Block middle flex={1}>
                {loadingSelfies ? (
                  <ActivityIndicator />
                ) : (
                  <Text
                    bold
                    color="#525F7F"
                    size={12}
                    style={{ marginBottom: 4 }}
                  >
                    {selfies.total}
                  </Text>
                )}
                <Text size={12}>Selfies</Text>
              </Block>
              <Block middle flex={1}>
                {loadingSelfies ? (
                  <ActivityIndicator />
                ) : (
                  <Text
                    bold
                    color="#525F7F"
                    size={12}
                    style={{ marginBottom: 4 }}
                  >
                    {comments.total}
                  </Text>
                )}

                <Text size={12}>Comments</Text>
              </Block>
            </Block>
            <ProfileName>
              <Text
                bold
                size={28}
                color="#32325D"
              >{`@${user.data.username}`}</Text>
              <Text
                bold
                size={16}
                color="#32325D"
              >{`${user.profile.first_name} ${user.profile.last_name}`}</Text>
            </ProfileName>
          </Block>

          <Block flex>
            <SelfiesTitle color="#32325D">Selfies</SelfiesTitle>
            <FlatList
              data={selfies.docs}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "space-between",
                padding: 10,
                paddingTop: 15,
              }}
              renderItem={({ item }) => (
                <PhotoContainer onPress={() => navigate(item)}>
                  <Image source={{ uri: item.path }} />
                </PhotoContainer>
              )}
              keyExtractor={(item) => item.id}
            />
          </Block>
        </ProfileContainer>
      </ImageBackground>

      <Modal
        position={"bottom"}
        ref={modal}
        isOpen={isOpen}
        onClosed={() => setIsOpen(false)}
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: 100,
        }}
      >
        <ButtonIcon onPress={() => handleChangeAvatarCamera()}>
          <MaterialIcons name="camera-alt" size={48} color="green" />
        </ButtonIcon>
        <ButtonIcon onPress={() => handleChangeAvatarGalery()}>
          <MaterialIcons name="photo-library" size={48} color="blue" />
        </ButtonIcon>
      </Modal>
    </Container>
  );
}

export default Profile;
