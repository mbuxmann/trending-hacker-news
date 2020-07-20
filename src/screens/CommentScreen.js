import React, { useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import Comment from "../components/Comment";
import FilledText from "../components/FilledText";
import { mainColor } from "../helpers/colorTheme";

const CommentScreen = ({ route }) => {
  const { title, postedBy, time, link, comments } = route.params;
  const [limit, setLimit] = useState(2);

  const handleOnEndReached = () => {
    setLimit(limit + 1);
  };

  const renderPostDetails = () => {
    return (
      <View style={styles.renderPostContainerStyle}>
        <View style={styles.postContentStyle}>
          <Text style={styles.postTitleStyle}>{title}</Text>
          <View style={styles.postDetailsStyle}>
            <Text style={styles.whiteTextStyle}>Posted by</Text>
            <FilledText
              backgroundColor="#fff"
              textColor={mainColor}
              text={postedBy}
            />
            <Text style={styles.whiteTextStyle}>{time}</Text>
          </View>
          <View>
            <Text style={styles.linkStyle}>{link}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderComments = () => {
    return (
      <View style={styles.renderCommentsContainerStyle}>
        <FlatList
          data={comments.slice(0, limit)}
          keyExtractor={(comment) => comment.toString()}
          renderItem={({ item }) => {
            return <Comment commentId={item} />;
          }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={1}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.fullFlexStyle} forceInset={{ top: "always" }}>
      {renderPostDetails()}
      <View style={styles.fullFlexStyle}>
        {comments.length > 0 ? renderComments() : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullFlexStyle: {
    flex: 1,
  },
  renderPostContainerStyle: {
    backgroundColor: mainColor,
  },
  postContentStyle: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  postTitleStyle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  postDetailsStyle: {
    flexDirection: "row",
  },
  whiteTextStyle: {
    color: "white",
  },
  linkStyle: {
    color: "white",
    marginVertical: 10,
  },
  renderCommentsContainerStyle: {
    flexDirection: "row",
  },
});

export default CommentScreen;
