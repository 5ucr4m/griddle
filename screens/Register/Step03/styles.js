import styled from "styled-components/native";

export const Container = styled.View`
  height: 100%;
`;
export const TextMessageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.Text`
  /* text-transform: uppercase; */
  font-size: 20px;
  font-weight: bold;
  color: #5d72e4;
  margin-bottom: 50px;
  width: 80%;
  align-self: center;
  text-align: center;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 80%;
  align-self: center;
`;
export const InputMessage = styled.TextInput.attrs({
  keyboardType: "number-pad",
  maxLength: 4,
  returnKeyType: "done"
})`
  border-bottom-width: 2px;
  border-bottom-color: #d9d9d9;
  color: #999;
  width: 250px;
  height: 50px;
  text-align: center;
  font-size: 28px;
  letter-spacing: ${props => (props.value.length > 1 ? 20 : 0)}px;
`;
