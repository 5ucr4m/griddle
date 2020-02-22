import styled from "styled-components/native";
import { Dimensions } from "react-native";
export const Container = styled.View``;

const { width } = Dimensions.get("screen");

export const ImageBackground = styled.ImageBackground`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;
  padding-top: 80px;
`;

export const ProfileContainer = styled.View`
  width: 90%;
  height: 88%;
  background-color: #f4f5f7;
  border-radius: 4;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  align-content: center;
  padding-top: 50px;
  padding-bottom: 10px;
`;

export const Block = styled.View`
  align-self: center;
  width: 80%;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  z-index: 5;
`;

export const ProfileName = styled.View`
  width: 100%;
  height: 60px;
  justify-content: space-around;
  align-items: center;
`;

export const TouchableOpacity = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
  elevation: 10
})`
  align-self: center;
  width: 154px;
  height: 154px;
  border-radius: 12px;
  margin-top: -114px;
  border: 5px solid #fff;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3);
`;

export const Loading = styled.View`
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export const ButtonIcon = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

export const SelfiesTitle = styled.Text`
  color: #32325d;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
`;

export const PhotoContainer = styled.TouchableOpacity.attrs({
  elevation: 20
})`
  background-color: #ddd;
  width: ${width * 0.27}px;
  height: ${width * 0.27}px;
  border-width: 3px;
  border-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
`;
