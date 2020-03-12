import styled from "styled-components/native";

export const Container = styled.View``;
export const Content = styled.View`
  width: 85%;
  align-self: center;
  background-color: #fff;
  height: 250px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
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
  background-color: #332286;
  width: 80%;
  height: 40px;
  margin-top: 20px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;
