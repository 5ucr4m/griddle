import React from "react";
import { Image as ImageIcon } from "react-native";

import body_vote from "../../../../assets/icons/body_vote.png";
import cute_vote from "../../../../assets/icons/cute_vote64.png";
import crazy_vote from "../../../../assets/icons/crazy_vote.png";
import eyes_vote from "../../../../assets/icons/eyes_vote.png";
import funny_vote from "../../../../assets/icons/funny_vote64.png";
import muscle_vote from "../../../../assets/icons/muscle_vote.png";
import hair_vote from "../../../../assets/icons/hair_vote.png";
import smile_vote from "../../../../assets/icons/smile_vote.png";
import winner_icon from "../../../../assets/icons/category_winner.png";

const icons = {
  body_vote,
  cute_vote,
  crazy_vote,
  eyes_vote,
  funny_vote,
  muscle_vote,
  hair_vote,
  smile_vote,
  winner_icon,
};

const VoteIcon = ({ url, type, style, ...props }) => {
  return (
    <ImageIcon
      source={icons[type]}
      resizeMode="cover"
      style={[{ width: 24, height: 24 }, style]}
      {...props}
    />
  );
};

export default VoteIcon;
