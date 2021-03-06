import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #3a1b8c;
`;

export const Content = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Item = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Text = styled.Text``;
export const Block = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Avatar = styled.Image`
  margin-left: 20px;
  margin-right: 15px;
  margin-top: 15px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border-width: 1px;

  border-color: #999;
`;
