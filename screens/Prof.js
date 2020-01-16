import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  Picker
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import * as SQLite from "expo-sqlite";
import { Linking } from "expo";

const db = SQLite.openDatabase("griddledb.db");

cleanUp = navigation => {
  navigation.navigate("Onboarding", { logoff: true });
};

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {
  state = {
    editing: false,
    token: "",
    id: 0,
    fname: "",
    lname: "",
    picture: "",
    image_base64: "",
    phone: "",
    street: "",
    number: "",
    city: "",
    county: "United States",
    state: "AL",
    facebook: "",
    linkedin: "",
    twitter: "",
    pinterest: "",
    instagram: ""
  };

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM user;", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          //temp.push(results.rows.item(i));
          // console.log(results.rows.item(i));

          //getting the profile data
          this.setState({
            token: results.rows.item(i).token,
            id: JSON.parse(results.rows.item(i).profile).profile.id,
            fname: JSON.parse(results.rows.item(i).profile).fname,
            lname: JSON.parse(results.rows.item(i).profile).lname,
            city: JSON.parse(results.rows.item(i).profile).profile.city,
            state: JSON.parse(results.rows.item(i).profile).profile.state,
            county: JSON.parse(results.rows.item(i).profile).profile.county,
            picture: JSON.parse(results.rows.item(i).profile).profile.picture,
            phone: JSON.parse(results.rows.item(i).profile).profile.phone,
            facebook: JSON.parse(results.rows.item(i).profile).profile.facebook,
            linkedin: JSON.parse(results.rows.item(i).profile).profile.linkedin,
            twitter: JSON.parse(results.rows.item(i).profile).profile.twitter,
            pinterest: JSON.parse(results.rows.item(i).profile).profile
              .pinterest,
            instagram: JSON.parse(results.rows.item(i).profile).profile
              .instagram
          });

          return true;
        }
      });
    });

    Images.Viewed = [];
  }

  render() {
    const { navigation } = this.props;

    // console.log(['photoURI', navigation.getParam('photoUri', this.state.picture )]);
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={true}
              style={{ width, marginTop: "25%" }}
            >
              <Block flex style={styles.profileCard}>
                {!this.state.editing && (
                  <Block middle style={styles.avatarContainer}>
                    <Image
                      source={{
                        uri:
                          navigation.getParam("photoUri") != undefined
                            ? navigation.getParam("photoUri")
                            : this.state.picture
                            ? this.state.picture
                            : Images.ProfilePicture
                      }}
                      style={styles.avatar}
                    />
                  </Block>
                )}
                {this.state.editing && (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Camera", { profileScreen: true })
                    }
                  >
                    <Block middle style={styles.avatarContainer}>
                      <Image
                        source={{
                          uri:
                            navigation.getParam("photoUri") != undefined
                              ? navigation.getParam("photoUri")
                              : this.state.picture
                              ? this.state.picture
                              : Images.ProfilePicture
                        }}
                        style={styles.avatar}
                      />
                      {this.state.editing && (
                        <Button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            shadowColor: "transparent",
                            elevation: 0,
                            top: -80
                          }}
                          onPress={() =>
                            navigation.navigate("Camera", {
                              profileScreen: true
                            })
                          }
                        >
                          CLICK TO EDIT
                        </Button>
                      )}
                    </Block>
                  </TouchableOpacity>
                )}
                <Block style={styles.info}>
                  <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 20, paddingBottom: 24 }}
                  >
                    <Button
                      small
                      style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                      onPress={() => cleanUp(navigation)}
                    >
                      LOGOFF
                    </Button>
                  </Block>
                  <Block row space="between">
                    <Block middle>
                      <Text
                        bold
                        size={12}
                        color="#525F7F"
                        style={{ marginBottom: 4 }}
                      >
                        0
                      </Text>
                      <Text size={12}>Friends</Text>
                    </Block>
                    <Block middle>
                      <Text
                        bold
                        color="#525F7F"
                        size={12}
                        style={{ marginBottom: 4 }}
                      >
                        {navigation.getParam("userPictures", 0)}
                      </Text>
                      <Text size={12}>Selfies</Text>
                    </Block>
                    <Block middle>
                      <Text
                        bold
                        color="#525F7F"
                        size={12}
                        style={{ marginBottom: 4 }}
                      >
                        0
                      </Text>
                      <Text size={12}>Comments</Text>
                    </Block>
                  </Block>
                </Block>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    {!this.state.editing && (
                      <Text bold size={28} color="#32325D">
                        {this.state.fname} {this.state.lname}
                      </Text>
                    )}

                    {this.state.editing && (
                      <Block style={{ flexDirection: "row" }}>
                        <Input
                          style={{ width: width * 0.4 }}
                          shadowless={false}
                          borderless={false}
                          placeholder="First Name"
                          label="First Name"
                          onChangeText={input_fname =>
                            this.setState({ fname: input_fname })
                          }
                          value={this.state.fname}
                        />

                        <Input
                          style={{ width: width * 0.4, marginLeft: 10 }}
                          shadowless={false}
                          borderless={false}
                          placeholder="Last Name"
                          label="Last Name"
                          onChangeText={input_lname =>
                            this.setState({ lname: input_lname })
                          }
                          value={this.state.lname}
                        />
                      </Block>
                    )}
                    {!this.state.editing && (
                      <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                        {this.state.city ? this.state.city + "," : ""}{" "}
                        {this.state.state ? this.state.state + "," : ""}{" "}
                        {this.state.county ? this.state.county : ""}
                      </Text>
                    )}
                    {!this.state.editing && (
                      <Block style={{ flexDirection: "row" }}>
                        {
                          /*this.state.phone &&*/
                          <TouchableOpacity
                            style={{ flexDirection: "row" }}
                            onPress={() =>
                              Linking.openURL("tel:" + this.state.phone)
                            }
                          >
                            <Icon
                              family="IonIcon"
                              size={20}
                              name="md-phone-portrait"
                              color={argonTheme.COLORS["ICON"]}
                            />
                            <Text style={{ fontSize: 14 }}>
                              {" " + (this.state.phone ? this.state.phone : "")}
                            </Text>
                          </TouchableOpacity>
                        }
                        {
                          /*this.state.facebook &&*/
                          <TouchableOpacity
                            style={{ flexDirection: "row", marginLeft: 10 }}
                            onPress={() =>
                              Linking.openURL(
                                "https://facebook.com/" + this.state.facebook
                              )
                            }
                          >
                            <Icon
                              family="IonIcon"
                              size={20}
                              name="logo-facebook"
                              color={argonTheme.COLORS["ICON"]}
                            />
                            <Text style={{ fontSize: 14 }}>
                              {" " +
                                (this.state.facebook
                                  ? this.state.facebook
                                  : "")}
                            </Text>
                          </TouchableOpacity>
                        }
                      </Block>
                    )}

                    {this.state.editing && (
                      <Block>
                        <Block
                          middle
                          style={styles.nameInfo}
                          style={{ flexDirection: "row" }}
                        >
                          <Input
                            style={{ width: width * 0.8 }}
                            shadowless={false}
                            borderless={false}
                            placeholder="City"
                            label="City"
                            onChangeText={input_city =>
                              this.setState({ city: input_city })
                            }
                            value={this.state.city}
                          />
                        </Block>
                        <Block middle style={{ flexDirection: "row" }}>
                          <Picker
                            selectedValue={this.state.state}
                            style={{ width: width * 0.4 }}
                            itemStyle={{
                              shadowColor: argonTheme.COLORS.BLACK,
                              shadowOffset: { width: 0, height: 1 },
                              shadowRadius: 2,
                              shadowOpacity: 0.05,
                              elevation: 2,
                              color: "red"
                            }}
                            onValueChange={input_state => {
                              this.setState({ state: input_state });
                            }}
                          >
                            <Picker.Item label="Alabama" value="AL" />
                            <Picker.Item label="Alaska" value="AK" />
                            <Picker.Item label="Arizona" value="AZ" />
                            <Picker.Item label="Arkansas" value="AR" />
                            <Picker.Item label="California" value="CA" />
                            <Picker.Item label="Colorado" value="CO" />
                            <Picker.Item label="Connecticut" value="CT" />
                            <Picker.Item label="Delaware" value="DE" />
                            <Picker.Item label="Florida" value="FL" />
                            <Picker.Item label="Georgia" value="GA" />
                            <Picker.Item label="Hawaii" value="HI" />
                            <Picker.Item label="Idaho" value="ID" />
                            <Picker.Item label="Illinois" value="IL" />
                            <Picker.Item label="Indiana" value="IN" />
                            <Picker.Item label="Iowa" value="IA" />
                            <Picker.Item label="Kansas" value="KS" />
                            <Picker.Item label="Kentucky" value="KY" />
                            <Picker.Item label="Louisiana" value="LA" />
                            <Picker.Item label="Maine" value="ME" />
                            <Picker.Item label="Maryland" value="MD" />
                            <Picker.Item label="Massachusetts" value="MA" />
                            <Picker.Item label="Michigan" value="MI" />
                            <Picker.Item label="Minnesota" value="MN" />
                            <Picker.Item label="Mississippi" value="MS" />
                            <Picker.Item label="Missouri" value="MO" />
                            <Picker.Item label="Montana" value="MT" />
                            <Picker.Item label="Nebraska" value="NE" />
                            <Picker.Item label="Nevada" value="NV" />
                            <Picker.Item label="New Hampshire" value="NH" />
                            <Picker.Item label="New Jersey" value="NJ" />
                            <Picker.Item label="New Mexico" value="NM" />
                            <Picker.Item label="New York" value="NY" />
                            <Picker.Item label="North Carolina" value="NC" />
                            <Picker.Item label="North Dakota" value="ND" />
                            <Picker.Item label="Ohio" value="OH" />
                            <Picker.Item label="Oklahoma" value="OK" />
                            <Picker.Item label="Oregon" value="OR" />
                            <Picker.Item label="Pennsylvania" value="PA" />
                            <Picker.Item label="Rhode Island" value="RI" />
                            <Picker.Item label="South Carolina" value="SC" />
                            <Picker.Item label="South Dakota" value="SD" />
                            <Picker.Item label="Tennessee" value="TN" />
                            <Picker.Item label="Texas" value="TX" />
                            <Picker.Item label="Utah" value="UT" />
                            <Picker.Item label="Vermont" value="VT" />
                            <Picker.Item label="Virginia" value="VA" />
                            <Picker.Item label="Washington" value="WA" />
                            <Picker.Item label="West Virginia" value="WV" />
                            <Picker.Item label="Wisconsin" value="WI" />
                            <Picker.Item label="Wyoming" value="WY" />
                          </Picker>
                          <Picker
                            selectedValue={this.state.county}
                            style={{
                              width: width * 0.4,
                              border: 1,
                              marginLeft: 10
                            }}
                            onValueChange={input_county => {
                              this.setState({ county: input_county });
                            }}
                          >
                            <Picker.Item
                              label="United States"
                              value="United States"
                            />
                            <Picker.Item label="Canada" value="Canada" />
                            <Picker.Item label="Mexico" value="Mexico" />
                          </Picker>
                        </Block>
                      </Block>
                    )}
                    {this.state.editing && (
                      <Block>
                        <Block
                          middle
                          style={styles.nameInfo}
                          style={{ flexDirection: "row" }}
                        >
                          <Input
                            style={{ width: width * 0.4 }}
                            shadowless={false}
                            borderless={false}
                            placeholder="Phone"
                            label="Phone"
                            onChangeText={input_phone =>
                              this.setState({ phone: input_phone })
                            }
                            value={this.state.phone}
                          />
                          <Input
                            style={{ width: width * 0.4, marginLeft: 10 }}
                            shadowless={false}
                            borderless={false}
                            placeholder="Facebook"
                            label="Facebook"
                            onChangeText={input_facebook =>
                              this.setState({ facebook: input_facebook })
                            }
                            value={this.state.facebook}
                          />
                        </Block>
                        <Block
                          middle
                          style={styles.nameInfo}
                          style={{ flexDirection: "row" }}
                        >
                          <Input
                            style={{ width: width * 0.4 }}
                            shadowless={false}
                            borderless={false}
                            placeholder="Twitter"
                            label="Twitter"
                            onChangeText={input_twitter =>
                              this.setState({ twitter: input_twitter })
                            }
                            value={this.state.twitter}
                          />
                          <Input
                            style={{ width: width * 0.4, marginLeft: 10 }}
                            shadowless={false}
                            borderless={false}
                            placeholder="Linkedin"
                            label="Linkedin"
                            onChangeText={input_linkedin =>
                              this.setState({ linkedin: input_linkedin })
                            }
                            value={this.state.linkedin}
                          />
                        </Block>
                        <Block
                          middle
                          style={styles.nameInfo}
                          style={{ flexDirection: "row" }}
                        >
                          <Input
                            style={{ width: width * 0.4 }}
                            shadowless={false}
                            borderless={false}
                            placeholder="Instagram"
                            label="Instagram"
                            onChangeText={input_instagram =>
                              this.setState({ instagram: input_instagram })
                            }
                            value={this.state.instagram}
                          />
                          <Input
                            style={{ width: width * 0.4, marginLeft: 10 }}
                            shadowless={false}
                            borderless={false}
                            placeholder="Pinterest"
                            label="Pinterest"
                            onChangeText={input_pinterest =>
                              this.setState({ pinterest: input_pinterest })
                            }
                            value={this.state.pinterest}
                          />
                        </Block>
                      </Block>
                    )}

                    <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                      <Block style={styles.divider} />
                    </Block>
                    <Block middle style={{ flexDirection: "row" }}>
                      <Text
                        size={16}
                        color="#525F7F"
                        style={{ textAlign: "center" }}
                      ></Text>
                      <Button
                        color="transparent"
                        textStyle={{
                          color: "#233DD2",
                          fontWeight: "500",
                          fontSize: 16
                        }}
                        style={{ width: width * 0.4 }}
                        onPress={() => {
                          this.setState({ editing: !this.state.editing });

                          if (this.state.editing) {
                            /*
                          console.log(['PUT http://67.227.214.144:3010/profiles/' + this.state.id, 
                          this.state.token,
                          JSON.stringify(
                            {
                                "first_name": this.state.fname,
                                "last_name": this.state.lname,
                                "city": this.state.city,
                                "county": this.state.county,
                                "picture": navigation.getParam('photoUri'),
                                "image_base64": navigation.getParam('base64'),
                                "phone": "8060",
                                "street": "asdfasdfasdf1",
                                "number": "",
                                "city": "",
                                "county": "",
                                "state": "",
                                "facebook": "",
                                "linkedin": "",
                                "twitter": "",
                                "pinterest": "",
                                "instagram": ""
                            })
                          ]);*/
                            fetch(
                              "http://67.227.214.144:3010/profiles/" +
                                this.state.id,
                              {
                                method: "PUT",
                                cache: "no-cache",
                                headers: {
                                  "Content-Type": "application/json",
                                  // 'Content-Type': 'application/x-www-form-urlencoded',
                                  Authorization: "Bearer " + this.state.token
                                },
                                body: JSON.stringify({
                                  first_name: this.state.fname,
                                  last_name: this.state.lname,
                                  city: this.state.city,
                                  state: this.state.state,
                                  county: this.state.county,
                                  picture: navigation.getParam("photoUri")
                                    ? navigation.getParam("photoUri")
                                    : this.state.picture,
                                  image_base64: navigation.getParam("base64"),
                                  phone: this.state.phone,
                                  /*"street": this.state.,*/
                                  /*"number": this.state.,*/
                                  facebook: this.state.facebook,
                                  linkedin: this.state.linkedin,
                                  twitter: this.state.twitter,
                                  pinterest: this.state.pinterest,
                                  instagram: this.state.instagram
                                })
                              }
                            )
                              .then(res => {
                                // console.log(res);
                                res.json();
                              })
                              .then(res => {
                                //   console.log(res);
                                if (parseInt(res.status) != 200) {
                                  alert("Error: " + res.status);
                                }
                              })
                              .catch(error => {
                                // console.log("get data error:", error);
                              });
                          }
                        }}
                      >
                        {this.state.editing ? "Save" : "Edit Profile"}
                      </Button>
                      <Button
                        color="transparent"
                        textStyle={{
                          color: "#233DD2",
                          fontWeight: "500",
                          fontSize: 16
                        }}
                        style={{ width: width * 0.4 }}
                        onPress={() => navigation.navigate("Home")}
                      >
                        Go back Home
                      </Button>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
        {/* <ScrollView showsVerticalScrollIndicator={false} 
                    contentContainerStyle={{ flex: 1, width, height, zIndex: 9000, backgroundColor: 'red' }}>
        <Block flex style={styles.profileCard}>
          <Block middle style={styles.avatarContainer}>
            <Image
              source={{ uri: Images.ProfilePicture }}
              style={styles.avatar}
            />
          </Block>
          <Block style={styles.info}>
            <Block
              middle
              row
              space="evenly"
              style={{ marginTop: 20, paddingBottom: 24 }}
            >
              <Button small style={{ backgroundColor: argonTheme.COLORS.INFO }}>
                CONNECT
              </Button>
              <Button
                small
                style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
              >
                MESSAGE
              </Button>
            </Block>

            <Block row space="between">
              <Block middle>
                <Text
                  bold
                  size={12}
                  color="#525F7F"
                  style={{ marginBottom: 4 }}
                >
                  2K
                </Text>
                <Text size={12}>Orders</Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{ marginBottom: 4 }}>
                  10
                </Text>
                <Text size={12}>Photos</Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{ marginBottom: 4 }}>
                  89
                </Text>
                <Text size={12}>Comments</Text>
              </Block>
            </Block>
          </Block>
          <Block flex>
              <Block middle style={styles.nameInfo}>
                <Text bold size={28} color="#32325D">
                  Jessica Jones, 27
                </Text>
                <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                  San Francisco, USA
                </Text>
              </Block>
              <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                <Block style={styles.divider} />
              </Block>
              <Block middle>
                <Text size={16} color="#525F7F" style={{ textAlign: "center" }}>
                  An artist of considerable range, Jessica name taken by
                  Melbourne …
                </Text>
                <Button
                  color="transparent"
                  textStyle={{
                    color: "#233DD2",
                    fontWeight: "500",
                    fontSize: 16
                  }}
                >
                  Show more
                </Button>
              </Block>
              <Block
                row
                style={{ paddingVertical: 14, alignItems: "baseline" }}
              >
                <Text bold size={16} color="#525F7F">
                  Album
                </Text>
              </Block>
              <Block
                row
                style={{ paddingBottom: 20, justifyContent: "flex-end" }}
              >
                <Button
                  small
                  color="transparent"
                  textStyle={{ color: "#5E72E4", fontSize: 12 }}
                >
                  View all
                </Button>
              </Block>
              <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                <Block row space="between" style={{ flexWrap: "wrap" }}>
                  {Images.Viewed.map((img, imgIndex) => (
                    <Image
                      source={{ uri: img }}
                      key={`viewed-${img}`}
                      resizeMode="cover"
                      style={styles.thumb}
                    />
                  ))}
                </Block>
              </Block>
          </Block>
        </Block>
                  </ScrollView>*/}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height + (Platform.OS === "android" ? HeaderHeight - 50 : -50),
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

export default Profile;
