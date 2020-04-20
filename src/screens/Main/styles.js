import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: #332286;
`;

export const Wrapper = styled(LinearGradient).attrs({
  colors: ["#332286", "#ffffff"]
})`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  background: #fff;
`;
