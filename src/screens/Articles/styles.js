import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Background = styled(LinearGradient).attrs({
  colors: ["#332286", "#eee"],
})`
  flex: 1;
  background-color: #333;
`;

export const Container = styled.SafeAreaView`
  justify-content: center;
  flex: 1;
`;

export const Content = styled.ScrollView`
  width: 100%;
  background-color: #eee;
  flex: 1;
`;

export const Author = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const Title = styled.Text`
  font-size: 18px;
`;

export const WrapperIcons = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const Abuse = styled.Text`
  width: 100%;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-align: right;
  padding: 5px 10px;
`;
