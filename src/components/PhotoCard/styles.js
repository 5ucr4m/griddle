import styled from "styled-components/native";

import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const Container = styled.View`
  width: ${width}px;
  background-color: #fff;
`;

export const Author = styled.Text`
  font-size: 18px;
  font-weight: bold;
  background-color: #fff;
`;

export const Title = styled.Text`
  font-size: 16px;
  background-color: #fff;
`;

export const Comments = styled.Text`
  font-weight: bold;
  font-size: 16px;
  height: 18px;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
`;

export const IconsWrapper = styled.View`
  position: absolute;
  background: #fff;
  width: 90%;
  bottom: 100px;
  left: 20px;
  border-radius: 8px;
  padding: 10px 0px;
  z-index: 99;
`;

export const Divider = styled.View`
  height: 1px;
  width: 100%;
  background: #ddd;
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const Emots = styled.View`
  flex-direction: row;
  height: 20px;
  width: 80%;
  align-items: center;
  margin: 3px 5px 2px;
  height: 35px;
`;
