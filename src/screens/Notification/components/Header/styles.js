import styled, { css } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled(LinearGradient).attrs({
  colors: ["#332286", "#6D4FB2"],
})`
  flex-direction: row;
  width: 100%;
  height: 80px;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Block = styled.View`
  flex-direction: row;
  flex: ${(props) => (!!props.flex ? props.flex : 1)};
  ${(props) =>
    !!props.center &&
    css`
      justify-content: center;
    `}

  ${(props) =>
    !!props.right &&
    css`
      justify-content: flex-end;
    `}
`;

export const Icon = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  ${(props) =>
    !!props.right &&
    css`
      align-items: flex-end;
    `}

  ${(props) =>
    !!props.center &&
    css`
      align-items: center;
    `}
`;
