import styled from "styled-components/native";
import { Animated } from "react-native";
import { BlurView } from "expo-blur";

export const Container = styled(Animated.View)`
  flex: 1;
  width: 100%;
  position: absolute;
  top: -163;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Content = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`;

export const Background = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.6);
`;

export const Blur = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  z-index: 8;
`;

export const User = styled.Text`
  margin-left: 5px;
  font-weight: bold;
  font-size: 16px;
  margin-top: 3px;
  color: #fff;
`;

export const Title = styled.Text`
  margin-left: 5px;
  font-size: 16px;
  margin-top: 5px;
  color: #fff;
`;

export const Comments = styled.Text`
  margin-left: 5px;
  font-size: 13px;
  margin-top: 4px;
  color: #fff;
`;

export const Info = styled.View`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px 10px;
  border-radius: 5px;
  margin-top: 5px;
`;
