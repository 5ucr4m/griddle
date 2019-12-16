import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNavigationFocus } from "react-navigation";

import {
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  View,
  SafeAreaView
} from "react-native";

import { addNoty } from "../store/modules/notify/actions";
import { loadPictures, loading } from "../store/modules/pictures/actions";

import { Block, Text, theme } from "galio-framework";
import * as ImagePicker from "expo-image-picker";
import { Card, Icon } from "../components";
import articles from "../constants/articles";
import argonTheme from "../constants/Theme";
import Lightbox from "../components/lightbox";
import * as Permissions from "expo-permissions";
import MasonryList from "react-native-masonry-list";
import { FontAwesome } from "@expo/vector-icons";
import { Notifications } from "expo";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("griddledb.db");

const { height, width } = Dimensions.get("screen");
const WINDOW_HEIGHT = Dimensions.get("window").height;
const DRAG_DISMISS_THRESHOLD = 150;

const PUSH_ENDPOINT = "http://67.227.214.144/~webgriddle/static.php";

class Home extends React.Component {
  state = {
    token: "",
    user_id: 0,
    showFeatured: false,
    modalVisible: false,
    currentItem: articles[0],
    modalAnimationIn: "bounceInLeft",
    modalAnimationOut: "bounceOutRight",
    userPictures: 0,
    xPosition: new Animated.Value(0),
    multiplier: 1,
    articles: articles,
    pan: new Animated.Value(0)
  };

  async componentDidMount() {
    this.props.loading();
  }

  componentWillMount() {
    try {
      db.transaction(tx => {
        tx.executeSql("SELECT * FROM user;", [], (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            this.setState({
              token: results.rows.item(i).token,
              user_id: JSON.parse(results.rows.item(i).user).id,
              user_email: JSON.parse(results.rows.item(i).user).email
            });

            tx.executeSql(
              "SELECT * FROM user_access;",
              [],
              (tx, results) => {
                if (results.rows.length == 0) {
                  this.props.navigation.navigate("Intro", {
                    user: { id: this.state.user_id }
                  });
                } else {
                  this.renderLastPosts("Home");
                }
              },
              (tx, error) => {
                this.props.navigation.navigate("Onboarding", { logoff: true });
              }
            );

            return true;
          }
        });
      });
    } catch (error) {}
  }

  renderLastPosts = screen => {
    var x = 0;
    this.setState({ images: [] });

    if (screen == "Card") {
      this.setState({ showFeatured: false, multiplier: 1 });
    }

    if (this.state.token.trim().length < 5) {
      alert("Invalid Token. You must log in again.");
      this.props.navigation.navigate("Onboarding", { logoff: true });
    }

    fetch("http://67.227.214.144:3010/pictures/", {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token
      }
    })
      .then(res => res.json())
      .then(res => {
        //console.log(res.docs);
        articles.length = 0;

        res.docs.map((a, b) =>
          this.state.articles.push({
            title: a.name,
            image: a.path,
            uri: a.path,
            cta: "",
            id: x++,
            picture_id: a.id,
            user_id: a.user_id,
            vote: a.vote,
            comment: a.comment
          })
        );
        this.setState({
          images: articles,
          loaded: true,
          currentItem: articles[articles.length - 1],
          modalVisible: screen == "Home" || screen == "Card" ? false : true,
          showFeatured: screen == "Home" || screen == "Card" ? false : true
        });

        if (!this.state.showLightBox) {
          this.setState({ currentItem: articles[0], showLightBox: true });
        }

        if (articles.length % 2 != 0) {
          articles.push({
            title: "",
            image: ".",
            uri: ".",
            cta: "",
            id: x++,
            picture_id: -1,
            user_id: -1
          });
        }
      })
      .catch(error => {
        //   console.log("get data error:", error);
        alert("Something went wrong: " + error.message);
      });
  };

  _pickImage = async () => {
    try {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL,
        Permissions.NOTIFICATIONS
      );

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
        aspect: [3, 4]
      });

      if (!result.cancelled) {
        this.setState({ photoURI: result.uri, base64: result.base64 });

        try {
          if (articles[articles.length - 1].picture_id == -1) {
            articles.pop();
          }
        } catch (e) {
          console.log(e);
        }

        articles.push({
          title: "",
          image: result.uri,
          uri: result.uri,
          cta: "",
          id: articles.length + 1,
          picture_id: -1,
          user_id: this.state.user_id
        });
        this.setState({
          articles: articles,
          images: articles,
          showFeatured: true
        });

        this.renderFeatured();
      }
    } catch (e) {
      console.log(e);
    }
  };

  registerForPushNotifications = async () => {
    try {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;

      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== "granted") {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }

      // Stop here if the user did not grant permissions
      if (finalStatus !== "granted") {
        return;
      }

      let token = await Notifications.getExpoPushTokenAsync();
      Notifications.addListener(this._handleNotification);
      //   console.log(token);

      // POST the token to your backend server from where you can retrieve it to send push notifications.
      //   console.log(PUSH_ENDPOINT + '?token=' + token + '&user_email=' + this.state.user_email);
      await fetch(
        PUSH_ENDPOINT +
          "?token=" +
          token +
          "&user_email=" +
          this.state.user_email,
        {
          method: "GET"
        }
      ).then(
        res => {}
        // console.log(res)
      );
    } catch (e) {
      //   console.log(e);
    }
  };

  _handleNotification = noty => {
    this.props.addNoty(noty);
  };

  renderButtons = () => {
    const { navigation } = this.props;

    return (
      <Block
        flex
        row
        center
        style={{
          position: "absolute",
          paddingTop: 8,
          left: 0,
          width: width,
          bottom: 0,
          height: 50,
          backgroundColor: "#FFF"
        }}
      >
        <Block center style={{ width: "33%" }}>
          <Icon
            family="FontAwesome"
            size={24}
            name="phonelink-setup"
            color={argonTheme.COLORS["ICON"]}
            onPress={() => {
              var pictures = 0;
              for (var i = 0; i < articles.length; i++) {
                if (articles[i].user_id == this.state.user_id) {
                  //console.log(articles[i].user_id);
                  pictures++;
                }
              }
              this.setState({ userPictures: pictures });
              navigation.navigate("Profile", { userPictures: pictures });
            }}
          />
        </Block>
        <Block center style={{ width: "34%" }}>
          <Icon
            family="FontAwesome"
            size={24}
            name="photo-camera"
            color={argonTheme.COLORS["ICON"]}
            onPress={() => this._pickImage()}
          />
        </Block>
        <Block center style={{ width: "33%" }}>
          <Icon
            family="FontAwesome"
            size={24}
            name="photo-library"
            color={argonTheme.COLORS["ICON"]}
            onPress={() => {
              this.setState({ showFeatured: false, modalVisible: false });
              this.renderLastPosts("Refresh");
            }}
          />
        </Block>
      </Block>
    );
  };

  renderFeatured = () => {
    return (
      <Card
        hidePostBox={() =>
          this.setState({ showFeatured: false, modalVisible: false })
        }
        refresh={this.renderLastPosts}
        options={true}
        item={{
          id: articles.length,
          title: "",
          image: this.state.photoURI,
          uri: this.state.photoURI,
          cta: "",
          base64: this.state.base64,
          token: this.state.token,
          user_id: this.state.user_id
        }}
        full
        style={{
          position: "absolute",
          top: height / 2 - 320,
          left: 35,
          width: width - 100
        }}
      />
    );
  };

  didOpen = () => {
    this.setState({ multiplier: 1.5 });
  };

  willClose = () => {
    this.setState({ multiplier: 0 });
  };

  renderPost = item => {
    this.setState({
      modalVisible: false,
      showFeatured: false,
      currentItem: item
    });
    this.props.navigation.navigate("Articles", {
      item: item,
      user_id: this.state.user_id
    });
  };

  renderItems = () => {
    return articles.map(data => {
      return (
        <View style={{ flex: 1, width: width / 2 - 10, height: 100 }}>
          <Image
            source={{ uri: data.image }}
            style={{
              flex: 1,
              minWidth: 144,
              minHeight: 144,
              width: "100%",
              height: "100%"
            }}
          />
        </View>
      );
    });
  };

  render() {
    if (
      this.props.navigation.getParam("TakeSelfie") &&
      !this.state.firstSelfie
    ) {
      this.setState({ firstSelfie: true });
      this.setState({ currentItem: articles[0], showLightBox: false });
      this._pickImage();
    }

    this.registerForPushNotifications();

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this.state.showLightBox && (
          <Lightbox
            underlayColor="red"
            backgroundColor="rgba(0,0,0,0.6)"
            swipeToDismiss={false}
            width={this.state.currentItem.width}
            width={this.state.currentItem.height}
          >
            <View
              style={[
                styles.item,
                {
                  alignSelf: "center",
                  width: 300,
                  height: 200,
                  top: 0,
                  borderBottomLeftRadius: 20
                }
              ]}
            >
              <Image
                style={{
                  alignSelf: "center",
                  height: "100%",
                  width: "100%",
                  maxHeight: height * 0.8,
                  borderWidth: 0,
                  borderBottomLeftRadius: 20
                }}
                source={{ uri: this.state.currentItem.uri }}
                resizeMode="contain"
              />
            </View>
          </Lightbox>
        )}
        {console.log("params", !!this.props.navigation.state.params)}
        <MasonryList
          onPressImage={(item, index) => {
            this.renderPost(item);
          }}
          rerender={true}
          renderIndividualHeader={item => {
            return (
              <Text>
                {item.title.length >= 10
                  ? item.title.substr(0, 10) + "..."
                  : item.title}
              </Text>
            );
          }}
          renderIndividualFooter={item => {
            return (
              <Block Block flex row style={{ paddingBottom: 12 }}>
                <Block row style={{ width: "33%" }}>
                  <FontAwesome name={"heart"} size={18} color="red" />
                  <Text>{" " + item.vote.length + " "}</Text>
                  <FontAwesome name={"thumbs-o-up"} size={18} color="blue" />
                  <Text>{" " + item.comment.length + " "}</Text>
                </Block>
              </Block>
            );
          }}
          sorted={true}
          imageContainerStyle={{ borderRadius: 12 }}
          listContainerStyle={{ paddingBottom: 100 }}
          initialColToRender={2}
          initialNumInColsToRender={4}
          images={this.props.images}
        />
        <Block
          flex
          row
          center
          style={{
            position: "absolute",
            paddingTop: 8,
            left: 0,
            width: width,
            bottom: 0,
            height: 50,
            backgroundColor: "#FFF"
          }}
        >
          <Block center style={{ width: "33%" }}>
            <Icon
              family="FontAwesome"
              size={24}
              name="phonelink-setup"
              color={argonTheme.COLORS["ICON"]}
              onPress={() => {
                var pictures = 0;
                for (var i = 0; i < articles.length; i++) {
                  if (articles[i].user_id == this.state.user_id) {
                    pictures++;
                  }
                }
                this.setState({ userPictures: pictures });
                this.props.navigation.navigate("Profile", {
                  userPictures: pictures
                });
              }}
            />
          </Block>
          <Block center style={{ width: "34%" }}>
            <Icon
              family="FontAwesome"
              size={24}
              name="photo-camera"
              color={argonTheme.COLORS["ICON"]}
              onPress={() => this._pickImage()}
            />
          </Block>
          <Block center style={{ width: "33%" }}>
            <Icon
              family="FontAwesome"
              size={24}
              name="photo-library"
              color={argonTheme.COLORS["ICON"]}
              onPress={() => {
                this.setState({ showLightBox: true });
                this.renderLastPosts("Home");
              }}
            />
          </Block>
        </Block>
        {/* {this.state.showFeatured && this.renderFeatured()} */}
      </SafeAreaView>
    );

    /*
    return (
      <Block flex center style={styles.home}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}>
          <FlatList style={{margin:5, flexGrow: 0}}
              inverted={true}
              ref={(ref) => { this.flatListRef = ref }}
              getItemLayout={this.getItemLayout}
              numColumns={2}                  // set number of columns 
              columnWrapperStyle={styles.row}  // space them out evenly
              data={articles}
              initialScrollIndex={0}
              Extractor={(item, index) => item.id }
              renderItemAnt={(item, index) => <Card handleTouch={this.renderPost} item={item.item} style={{marginTop: Math.random() * 40, marginBottom: Math.random() * 50, opacity: this.state.modalVisible ? 0.4 : 1 }}/> }
              renderItem={(item, index) => 
                          <Lightbox
                                underlayColor="white" backgroundColor="rgba(0,0,0,0.4)" swipeToDismiss={false}
                                didOpen={() => this.didOpen()}
                                willClose={() => this.willClose()}
                                onContentTouch={() => {
                                    this.props.navigation.navigate('Articles', {item: item.item, user_id: this.state.user_id});
                                  }
                              }
                          >
                            <View style={[styles.item]}>
                              <View style={styles.itemInside, {flex:1, minWidth:144}}>
                                
                                <Image
                                  style={{
                                    alignSelf: 'center',
                                    height: "100%",
                                    width: "100%",
                                    minWidth:144,
                                    borderWidth: 0
                                  }}
                                  source={{uri:item.item.image}}
                                  resizeMode="center"
                                />
                                
                                <Text style={{alignSelf: 'center', textAlign:'center', backgroundColor:'#FFF', width: 28 + (this.state.multiplier ? 144 * this.state.multiplier : 144), height: 30}}>{(item.item.title.length >= 10 ? item.item.title.substr(0,10) + '...' : item.item.title )}</Text>
                                
                              </View>
                            </View>
                          </Lightbox>
              }
          />
        </ScrollView>
        {this.state.showFeatured && this.renderFeatured()}
          {this.renderButtons()}        
    </Block>
    );
    */
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    flex: 1,
    flexBasis: "10%",
    paddingTop: 0
  },
  header: {
    flexGrow: 1
  },
  buttonGroup: {
    flexGrow: 1
  },
  slider: {
    flexGrow: 1
  },
  button: {
    backgroundColor: "#dbdcdb",
    padding: 10,
    marginRight: 4,
    borderRadius: 4,
    borderBottomColor: "#7b7b7b",
    borderBottomWidth: 5
  },
  buttonText: {
    color: "#404040"
  },
  center: {
    marginTop: 30,
    marginBottom: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  headerTop: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    backgroundColor: "white"
  },
  userPic: {
    height: 20,
    width: 20,
    borderRadius: 10,
    marginRight: 10
  },
  userName: {
    fontSize: 20
  },
  home: {
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: 0
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  },
  item: {
    alignItems: "center",
    minWidth: 180,
    flexBasis: 0,
    flexGrow: 1,
    margin: 4,
    display: "flex",
    justifyContent: "center",
    padding: 10
  },
  itemInside: {
    width: 144,
    height: 256,
    backgroundColor: "#fff"
  },
  itemEmpty: {
    backgroundColor: "transparent"
  },
  text: {
    color: "#333333"
  }
});

const mapStateToProps = state => ({
  loading: state.pictures.loading,
  images: state.pictures.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addNoty, loadPictures, loading }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(Home));
