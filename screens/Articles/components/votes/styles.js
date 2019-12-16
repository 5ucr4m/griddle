import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const Container = styled.View`
  width: ${width}px;
  padding-left: 20px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Count = styled.Text`
  width: 100%;
  letter-spacing: 1px;
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
`;
