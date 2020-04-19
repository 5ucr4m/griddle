import styled, { css } from "styled-components/native";
import { Text as TextGalio } from "galio-framework";

const type = {
  success: css`
    font-size: 12px;
    text-transform: uppercase;
    font-weight: bold;
    color: green;
    padding: 7px 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px #ddd;
    letter-spacing: 0.5px;
  `,
  error: css`
    font-size: 12px;
    text-transform: uppercase;
    font-weight: bold;
    color: red;
    padding: 7px 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px #ddd;
    letter-spacing: 0.5px;
  `
};

export const Container = styled.View`
  height: 100%;
`;

export const Form = styled.View`
  flex: 1;
`;

export const Text = styled(TextGalio)`
  ${props => !!props.success && type.success}
  ${props => !!props.error && type.error}
`;
