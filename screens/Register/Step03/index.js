import React, { useState, useEffect } from "react";
import { Text } from "galio-framework";
import api from "../../../service/api";

import {
  Container,
  TextMessageContainer,
  Label,
  InputContainer,
  InputMessage
} from "./styles";
import { Block } from "../styles";

import { argonTheme } from "../../../constants";
import { Button } from "../../../components";

export default function Step03({ next, data }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);

  useEffect(() => {
    sendSms();
  }, []);

  useEffect(() => {
    code.length === 4 ? setDisabledBtn(false) : setDisabledBtn(true);
  }, [code]);

  async function sendSms() {
    const { phone } = data;
    await api.post("/check_phone", {
      phone
    });
  }

  async function handleCheckCode() {
    setLoading(true);
    const resp = await api.post("/check_code", {
      phone: data.phone,
      code
    });

    if (resp.data.confirmation) {
      setLoading(false);
      next();
    } else {
      alert("invalid code");
      setLoading(false);
    }
  }

  return (
    <Container>
      <TextMessageContainer>
        <Label>
          To verify your number, a 4 digits code was send to you by a text
          message.
        </Label>
        <InputContainer>
          <InputMessage
            value={code}
            placeholder="Enter your code"
            onChange={typeCode => setCode(typeCode.nativeEvent.text)}
          />
        </InputContainer>
      </TextMessageContainer>

      <Block>
        <Button
          color={disabledBtn ? "DISABLED" : "primary"}
          disabled={disabledBtn || loading}
          onPress={handleCheckCode}
          style={{ width: "100%" }}
          loading={loading}
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
