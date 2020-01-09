import React, { useState } from "react";
import { StatusBar, ScrollView } from "react-native";

import Step01 from "./Step01";
import Step02 from "./Step02";
import Step03 from "./Step03";
import Step04 from "./Step04";
import { Container, ImageBackground, RegisterContainer } from "./styles";

import { Images } from "../../constants";

export default function Register({ navigation }) {
  const [step, setStep] = useState(1);

  function nextStep() {
    setStep(step + 1);
  }

  function createAcount() {}

  return (
    <Container>
      <StatusBar hidden />
      <ImageBackground source={Images.RegisterBackground}>
        <RegisterContainer>
          {step === 1 && <Step01 next={nextStep} />}
          {step === 2 && <Step02 next={nextStep} />}
          {step === 3 && <Step03 next={nextStep} />}
          {step === 4 && <Step04 next={createAcount} />}
        </RegisterContainer>
      </ImageBackground>
    </Container>
  );
}
