import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Share,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Score from "./Score";
import FilledText from "./FilledText";
import LoadingBar from "./LoadingBar";
import Comment from "./Comment";
import { convertTime } from "../helpers/ConvertTime";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const color = "rgb(126, 175, 149)";

const Card = ({ id }) => {
  const [post, setPost] = useState({});
  const [currentTime, setCurrentTime] = useState(0);
  const navigation = useNavigation();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${post.title} - ${post.url}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        var response = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        if (mounted) setPost(response.data);
      } catch (error) {
        alert(error.message);
      }
    })();

    setCurrentTime(Math.floor(Date.now() / 1000));

    return () => (mounted = false);
  }, []);

  const renderCard = () => {
    return (
      <View style={styles.cardContentStyle}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("View", {
              url: post.url,
            })
          }
        >
          <Text style={styles.cardTitleStyle}>{post.title}</Text>
          <View style={styles.cardDetailsStyle}>
            <Text>Posted by</Text>
            <FilledText
              backgroundColor={color}
              textColor="#fff"
              text={post.by}
            />
            <Text>{convertTime(currentTime - post.time)}</Text>
            <Score score={post.score} />
          </View>
        </TouchableOpacity>

        <View style={styles.cardActionsContainerStyle}>
          <Icon
            style={styles.cardActionStyle}
            name="comments"
            size={20}
            color={color}
            onPress={() =>
              navigation.navigate("Comments", {
                title: post.title,
                postedBy: post.by,
                time: convertTime(currentTime - post.time),
                link: post.url,
                comments: post.kids,
              })
            }
          />
          <Icon
            style={styles.cardActionStyle}
            name="share"
            size={20}
            color={color}
            onPress={onShare}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.cardContainerStyle}>
      {Object.keys(post).length ? renderCard() : <LoadingBar />}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainerStyle: {
    marginHorizontal: 10,
    backgroundColor: "#fff",
    marginTop: 10,
    minHeight: 100,
    borderRadius: 5,
  },
  cardContentStyle: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  cardTitleStyle: {
    fontSize: 20,
    marginBottom: 10,
  },
  cardDetailsStyle: {
    flexDirection: "row",
    marginBottom: 10,
  },
  cardActionsContainerStyle: {
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  cardActionStyle: {
    flex: 1,
    textAlign: "center",
  },
});

export default Card;
