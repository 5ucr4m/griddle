import React, { useState, useEffect } from "react";
import { ActivityIndicator, Dimensions, Alert } from "react-native";
import Mask from "vanilla-masker";
import api from "../../../service/api";

import { Container, Form, Text } from "./styles";
import { Block, BlockRow } from "../styles";

import { argonTheme } from "../../../constants";
import { Button, Icon, Input } from "../../../components";

const { width } = Dimensions.get("window");

export default function Step02({ next, data }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [prefix, setPrefix] = useState("");
  const [avaliable, setAvaliable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);

  async function checkUser() {
    setLoading(true);
    const { data } = await api.post("/users/check_username", {
      username
    });
    setLoading(false);
    setAvaliable(data.avaliable);
  }

  function handleSetPrefix(text) {
    const value = Mask.toPattern(text, { pattern: "+999" });
    setPrefix(value);
  }

  async function handleSubmit() {
    next({ username, phone: `${prefix}${phone}` });
  }

  useEffect(() => {
    prefix.trim().length > 0 && phone.trim().length > 6 && avaliable
      ? setDisabledBtn(false)
      : setDisabledBtn(true);
  }, [phone, avaliable]);

  return (
    <Container>
      <Form>
        <Block>
          <Input
            borderless
            success
            placeholder="Username"
            onBlur={checkUser}
            onChangeText={username => {
              setAvaliable(null);
              setUsername(username);
            }}
            iconContent={
              loading ? (
                <ActivityIndicator size={16} style={{ marginRight: 12 }} />
              ) : (
                <Icon
                  size={16}
                  color={argonTheme.COLORS.ICON}
                  name="user"
                  family="Feather"
                  style={{ marginRight: 12 }}
                />
              )
            }
          />
          {avaliable !== null && !avaliable && (
            <Text error>
              <Icon size={14} color="red" name="x" family="Feather" />
              {"   "}
              Not avaliable
            </Text>
          )}
          {avaliable !== null && avaliable && (
            <Text success>
              <Icon size={14} color="green" name="check" family="Feather" />
              {"   "}
              Avaliable
            </Text>
          )}
        </Block>
        <BlockRow>
          <Input
            borderless
            keyboardType="phone-pad"
            returnKeyType="done"
            width={100}
            maxLength={4}
            value={prefix}
            placeholder="+234"
            onChangeText={text => {
              handleSetPrefix(text);
            }}
            iconContent={
              <Icon
                size={16}
                color={argonTheme.COLORS.ICON}
                name="phone"
                family="Feather"
                style={{ marginRight: 12 }}
              />
            }
          />
          <Block style={{ width: width * 0.9 * 0.8 - 110, marginLeft: 10 }}>
            <Input
              borderless
              keyboardType="phone-pad"
              returnKeyType="done"
              placeholder="Phone Number"
              onChangeText={input_phone => {
                setPhone(input_phone);
              }}
              iconContent={<></>}
            />
          </Block>
        </BlockRow>
      </Form>
      <Block>
        <Button
          color={disabledBtn ? "DISABLED" : "primary"}
          disabled={disabledBtn}
          onPress={handleSubmit}
          style={{ width: "100%" }}
        >
          <Text
            bold
            size={14}
            color={
              disabledBtn ? argonTheme.COLORS.MUTED : argonTheme.COLORS.WHITE
            }
          >
            NEXT STEP
          </Text>
        </Button>
      </Block>
    </Container>
  );
}
