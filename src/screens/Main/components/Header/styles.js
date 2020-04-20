import styled, { css } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const Container = styled(LinearGradient).attrs({
  colors: ["#332286", "#6D4FB2"]
})`
  flex-direction: row;
  width: 100%;
  height: ${height * 0.07}px;
  justify-content: space-between;
  align-items: center;
  padding-left: ${width * 0.028}px;
  padding-right: ${width * 0.028}px;
  border-bottom-width: 2px;
  border-bottom-color: #c56fd7;
  margin-top: 0;
`;

export const Block = styled.View`
  flex-direction: row;
  flex: ${props => (!!props.flex ? props.flex : 1)};
  ${props =>
    !!props.center &&
    css`
      justify-content: center;
    `}

  ${props =>
    !!props.right &&
    css`
      justify-content: flex-end;
    `}
`;

export const Icon = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  ${props =>
    !!props.right &&
    css`
      align-items: flex-end;
    `}

  ${props =>
    !!props.center &&
    css`
      align-items: center;
    `}
`;
