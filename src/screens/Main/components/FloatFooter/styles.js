import styled from "styled-components/native";
import { Animated } from "react-native";

export const Container = styled.View`
  position: absolute;
  bottom: 5px;
  height: 100px;
  left: 0;
  right: 0;
  z-index: 99;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 80px;
  background-color: rgba(51, 34, 134, 0.6);
  z-index: 99;
`;

export const Button = styled.TouchableOpacity`
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 60px;
  background-color: rgba(51, 34, 134, 0.6);
  z-index: 99;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(Animated.View)`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: ${props => (!!props.color ? props.color : "#332286")};
`;
