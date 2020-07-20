import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { mainColor } from "../helpers/colorTheme";

const LoadingBar = () => {
  return (
    <View style={styles.ActivityIndicatorContainerStyle}>
      <ActivityIndicator size="large" color={mainColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  ActivityIndicatorContainerStyle: {
    flex: 1,
    justifyContent: "center",
  },
});

export default LoadingBar;
