import React from "react";
import { Text } from "react-native";

const FilledText = ({ text, backgroundColor, textColor }) => {
  return (
    <Text
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 5,
        color: textColor,
        paddingHorizontal: 5,
        marginHorizontal: 5,
      }}
    >
      {text}
    </Text>
  );
};

export default FilledText;
