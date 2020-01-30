import React from "react";
import { Image } from "react-native";
import { withNavigation } from "react-navigation";

import { Container, Block, Icon } from "./styles";
import Logo from "../../../../assets/Logo.png";
import IconIcon from "../../../../assets/icons/icon.png";
import NotyIcon from "../../../../assets/icons/noty.png";

function Header({ navigation }) {
  return (
    <Container>
      <Block>
        <Icon>
          <Image source={IconIcon} style={{ width: 32, height: 32 }} />
        </Icon>
      </Block>
      <Block flex={2} center>
        <Image source={Logo}></Image>
      </Block>
      <Block>
        <Icon right>
          <Image source={NotyIcon} style={{ width: 32, height: 32 }} />
        </Icon>
      </Block>
    </Container>
  );
}

export default withNavigation(Header);
