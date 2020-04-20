import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const Container = styled.View`
  padding-top: 5px;
  padding-bottom: 7px;
  width: 100%;
  background-color: #fff;
  z-index: 50;
`;

export const ContainerInput = styled.View`
  height: 30px;
  width: 64.5%;
  margin-left: 23%;
  border-width: 2px;
  border-color: #d2cecf;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  padding: 0 12px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  text-align: center;
`;

export const SearchResult = styled.ScrollView`
  ${(props) => !props.visible && "display: none"};
  position: absolute;
  top: 45px;
  width: 90%;
  max-height: 200px;
  min-height: 40px;
  margin-left: 5%;
  border-width: 1px;
  border-color: #ddd;
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  z-index: 51;
  background: #e1e1e1;
`;

export const Text = styled.Text`
  font-size: 15px;
  line-height: 35px;
  font-weight: bold;
`;

export const TextNoResult = styled.Text`
  text-align: center;
  font-size: 15px;
  line-height: 35px;
  font-style: italic;
`;
