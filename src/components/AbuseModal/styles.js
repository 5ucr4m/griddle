import styled from "styled-components/native";

export const Container = styled.View``;

export const Content = styled.View`
  width: 85%;
  align-self: center;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 30px 0;
`;
export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const TextArea = styled.TextInput`
  margin-top: 30px;
  width: 80%;
  height: 100px;
  border-radius: 5px;
  padding: 10px;
  border-width: 0.5px;
  border-color: #ccc;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.disabled ? "rgba(51, 34, 134, 0.5)" : "rgba(51, 34, 134, 1)"};
  width: 80%;
  height: 40px;
  margin-top: 20px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

export const CloseModal = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #fff;
  top: -10px;
  right: -10px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;
