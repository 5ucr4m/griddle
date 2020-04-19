import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const ImageBackground = styled.ImageBackground`
  position: absolute;
  width: 101%;
  height: ${height + 100}px;
  z-index: -1;
`;

export const ContentHeader = styled.View`
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: #eee;
  border-bottom-color: #ddd;
  border-style: solid;
  border-bottom-width: 1px;
  margin-bottom: 30px;
`;

export const Content = styled.View`
  width: ${width * 0.9}px;
  background: #f4f5f7;
  border-radius: 4px;
  box-shadow: 0 4px 1px rgba(0, 0, 0, 0.1);
  align-items: center;
  padding-bottom: 50px;
`;

export const InputContainer = styled.View`
  width: 80%;
  margin-bottom: 30px;
`;
