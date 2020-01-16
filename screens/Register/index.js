import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import api from "../../service/api";

import Step01 from "./Step01";
import Step02 from "./Step02";
import Step03 from "./Step03";
import Step04 from "./Step04";
import { Container, ImageBackground, RegisterContainer } from "./styles";

import { Images } from "../../constants";

export default function Register({ navigation }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});

  useEffect(() => {
    console.log(data);
  }, [data]);

  function nextStep(returnData = null) {
    setStep(step + 1);
    if (!!returnData) {
      setData({ ...data, ...returnData });
    }
  }

  async function createAcount() {
    try {
      const newUser = {
        email: data.login,
        password: data.password,
        username: data.username,
        profile: { ...data.profile, phone: data.phone }
      };
      console.log("newUser: ", newUser);
      await api.post("/users/signup", newUser);
      alert("You were successfully registered");
      navigation.navigate("Onboarding");
    } catch (err) {
      alert("Something went wrong.");
      console.log(err.message);
    }
  }

  return (
    <Container>
      <StatusBar hidden />
      <ImageBackground source={Images.RegisterBackground}>
        <RegisterContainer>
          {step === 1 && <Step01 data={data} next={nextStep} />}
          {step === 2 && <Step02 data={data} next={nextStep} />}
          {step === 3 && <Step03 data={data} next={nextStep} />}
          {step === 4 && <Step04 data={data} next={createAcount} />}
        </RegisterContainer>
      </ImageBackground>
    </Container>
  );
}
