import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { mainColor } from "../helpers/colorTheme";
import Icon from "react-native-vector-icons/FontAwesome";

const Score = ({ score }) => {
  return (
    <View style={styles.containerStyle}>
      <Icon name="thumbs-up" size={15} color={mainColor} />
      <Text style={styles.textStyle}>{score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  textStyle: {
    marginLeft: 5,
    fontSize: 15,
  },
});

export default Score;
