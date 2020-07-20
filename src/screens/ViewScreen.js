import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import { WebView } from "react-native-webview";
import LoadingBar from "../components/LoadingBar";

const ViewScreen = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const { url } = route.params;

  return (
    <SafeAreaView style={styles.fullFlexStyle} forceInset={{ top: "always" }}>
      <WebView source={{ uri: url }} onLoadStart={() => setLoading(false)} />
      {loading ? (
        <View style={styles.loadingStyle}>
          <LoadingBar />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullFlexStyle: {
    flex: 1,
  },
  loadingStyle: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    backgroundColor: "white",
  },
});
export default ViewScreen;
