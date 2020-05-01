import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar, ActivityIndicator, FlatList } from "react-native";
import api from "../../service/api";
import { Block, Text } from "galio-framework";
import reverse from "../../helpers/arrayReverse";

import {
  Container,
  ImageBackground,
  ProfileContainer,
  Image,
  TouchableOpacity,
  ProfileName,
  Loading,
  SelfiesTitle,
  PhotoContainer,
} from "./styles";

import { Images } from "../../constants";

function Profile() {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [selfies, setSelfies] = useState([]);
  const [comments, setComments] = useState({ total: 0 });
  const [user] = useState(route.params.refUser);

  useEffect(() => {
    let userId = user.data.id;
    async function load() {
      const { data } = await api.get(`/users/${userId}/pictures`);
      const { data: total } = await api.get(`/users/${userId}/comments`);
      setComments(total);
      setSelfies(data);
      setLoading(false);
    }
    load();
  }, []);

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
          <TouchableOpacity>
            {loading ? (
              <Loading>
                <ActivityIndicator size="large" color="#000" />
              </Loading>
            ) : (
              <Image
                resizeMode="cover"
                source={{
                  uri: !!user.profile.picture
                    ? user.profile.picture
                    : Images.ProfilePicture,
                }}
              />
            )}
          </TouchableOpacity>
          <Block middle style={{ marginVertical: 20 }}>
            <Block row space="between" style={{ marginVertical: 20 }}>
              <Block middle flex={1}>
                {loading ? (
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
                {loading ? (
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
                {loading ? (
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
    </Container>
  );
}

export default Profile;
