import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const Container = styled.View`
  position: absolute;
  bottom: 5px;
  height: 100px;
  right: ${(width - 70) / 2}px;
  z-index: 99;
  /* margin: 0 auto; */
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 80px;
  z-index: 999;
`;

export const Button = styled.TouchableOpacity`
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 60px;
  z-index: 999;
  justify-content: center;
  align-items: center;
`;
