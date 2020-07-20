import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-navigation";
import Card from "../components/Card";
import LoadingBar from "../components/LoadingBar";
import axios from "axios";

const TrendingScreen = () => {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);

  const handleOnEndReached = () => {
    setLimit(limit + 5);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        var response = await axios.get(
          "https://hacker-news.firebaseio.com/v0/topstories.json"
        );
        if (mounted) setPosts(response.data);
      } catch (error) {
        alert(error.message);
      }
    })();

    return () => (mounted = false);
  }, []);

  const renderCards = () => {
    (async () => {
      await SplashScreen.hideAsync();
    })();
    return (
      <View style={styles.list}>
        <FlatList
          data={posts.slice(0, limit)}
          keyExtractor={(postId) => postId.toString()}
          renderItem={({ item }) => {
            return <Card id={item} />;
          }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={1}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    );
  };

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <ImageBackground
        source={require("../../assets/background.jpg")}
        style={styles.backgroundImgStyle}
      >
        {posts.length > 0 ? renderCards() : <LoadingBar />}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImgStyle: {
    width: "100%",
    height: "100%",
  },
  contentContainerStyle: {
    paddingVertical: 10,
  },
});

export default TrendingScreen;
