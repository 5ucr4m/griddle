import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const Container = styled.View`
  height: 110px;
  background: #fff;
  padding: 0 4%;
`;

export const Item = styled.TouchableOpacity`
  width: ${width * 0.2}px;
  align-items: center;
  margin-right: ${width * 0.033}px;
`;

export const Image = styled.Image`
  width: ${width * 0.2}px;
  height: ${width * 0.2}px;
  border-radius: ${width * 0.4}px;
`;

export const Name = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  margin-top: ${height * 0.01}px;
  margin-bottom: ${height * 0.016}px;
`;
