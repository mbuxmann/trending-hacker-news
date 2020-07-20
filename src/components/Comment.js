import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import LoadingBar from "./LoadingBar";
import FilledText from "./FilledText";
import { convertTime } from "../helpers/ConvertTime";
import { mainColor } from "../helpers/colorTheme";
import HTMLView from "react-native-htmlview";
import axios from "axios";

const Comment = ({ commentId }) => {
  const [comment, setComment] = useState({});
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        var response = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
        );
        if (mounted) setComment(response.data);
      } catch (error) {
        alert(error.message);
      }
    })();

    setCurrentTime(Math.floor(Date.now() / 1000));

    return () => (mounted = false);
  }, []);

  const renderComment = () => {
    return (
      <View style={styles.commentContainerStyle}>
        <View style={styles.commentStyle}>
          <HTMLView value={comment.text} />
          <View style={styles.commentDetailStyle}>
            <Text>posted by</Text>
            <FilledText
              backgroundColor={mainColor}
              textColor="#fff"
              text={comment.by}
            />
            <Text>{convertTime(currentTime - comment.time)}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderSubcomments = () => {
    return (
      <View style={styles.fullFlexStyle}>
        {comment.kids ? (
          <View style={styles.renderSubcommentsContainerStyle}>
            <View style={styles.indentationStyle} />
            <FlatList
              style={styles.fullFlexStyle}
              data={comment.kids}
              keyExtractor={(comment) => comment.toString()}
              renderItem={({ item }) => {
                return <Comment commentId={item} />;
              }}
            />
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View>
      {Object.keys(comment).length ? (
        renderComment()
      ) : (
        <View style={styles.loadingBarContainerStyle}>
          <LoadingBar />
        </View>
      )}
      {renderSubcomments()}
    </View>
  );
};

const styles = StyleSheet.create({
  fullFlexStyle: {
    flex: 1,
  },
  commentContainerStyle: {
    flexDirection: "row",
  },
  commentStyle: {
    flex: 1,
    padding: 5,
    marginHorizontal: 5,
    marginBottom: 5,

    borderRadius: 5,
  },
  commentDetailStyle: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "flex-end",
  },
  renderSubcommentsContainerStyle: {
    flexDirection: "row",
    marginLeft: 1,
  },
  indentationStyle: {
    backgroundColor: mainColor,
    width: 10,
  },
  loadingBarContainerStyle: {
    minHeight: 100,
  },
});

export default Comment;
