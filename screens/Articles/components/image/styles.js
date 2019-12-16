import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const Container = styled.View`
  margin-bottom: 20px;
  box-shadow: 2px 2px 10px #ddd;
  border-radius: 5px;
`;
export const Image = styled.Image`
  width: ${width}px;
  margin: 0 auto;
  height: ${height / 2}px;
`;
