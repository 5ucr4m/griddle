import styled from "styled-components/native";

import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const Container = styled.View`
  width: ${width}px;
  height: 500px;
  background-color: #fff;
  margin-bottom: 15px;
`;

export const Author = styled.Text`
  font-size: 15px;
  font-weight: bold;
  background-color: #fff;
`;

export const Title = styled.Text`
  font-size: 14px;
  background-color: #fff;
`;

export const Comments = styled.Text`
  margin-left: 5px;
  font-weight: bold;
  font-size: 13px;
`;

export const IconsWrapper = styled.View`
  position: absolute;
  background: #fff;
  width: 80%;
  bottom: 100px;
  left: 20px;
  border-radius: 8px;
  padding: 10px 0px;
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
`;
