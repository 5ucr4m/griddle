import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const Container = styled(LinearGradient).attrs({
  colors: ["#6842A2", "#3A1B8C"]
})`
  flex-direction: row;
  width: 100%;
  height: ${height * 0.07}px;
  align-items: center;
  justify-content: space-between;
`;

export const Icon = styled.TouchableOpacity`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: center;
  align-items: center;
`;

export const Noty = styled.View`
  bottom: -10;
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background: red;
  z-index: 10;
`;
