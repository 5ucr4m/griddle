import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const Container = styled.View`
  width: ${width}px;
  padding-left: 20px;
`;

export const Title = styled.Text`
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Count = styled.Text`
  width: 100%;
  letter-spacing: 1px;
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const Input = styled.TextInput`
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  padding: 0 15px;
  border-style: solid;
  border-bottom-width: 0.5px;
  border-bottom-color: #eee;
`;

export const Button = styled.TouchableOpacity`
  padding: 10px;
`;

export const CommentContainer = styled.View`
  margin-bottom: 5px;
`;
export const Comment = styled.Text`
  color: #999;
`;
export const CommentUser = styled.Text`
  color: #000;
  font-weight: 500;
`;

export const ActivityIndicator = styled.ActivityIndicator`
  padding: 10px;
`;
