import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { StoryProfile } from '@/components/StoryProfile';
import PostHome from '@/components/PostHome';
import { StoriesProfile } from '@/types/story';
import { usePostContext } from '@/providers/post';
import { useEffect, useState } from 'react';
import { PostResponse } from '@/types/post';
import { IOScrollView } from 'react-native-intersection-observer';




export default function TabOneScreen() {
  const storiesProile: StoriesProfile[] = [{
    name: "david",
    id: 0,
    avatarImg: require("../../../assets/images/avatar_1.png"),
  },
  {
    id: 1,
    name: "david",
    avatarImg: require("../../../assets/images/avatar_2.png"),

  }, {
    name: "david",
    id: 2,
    avatarImg: require("../../../assets/images/avatar_3.png"),
  }, {
    name: "david",
    id: 3,
    avatarImg: require("../../../assets/images/avatar_4.png"),
  }, {
    name: "david",
    id: 4,
    avatarImg: require("../../../assets/images/avatar_5.png"),
  }, {
    name: "david",
    id: 5,
    avatarImg: require("../../../assets/images/avatar_6.png"),
  }, {
    name: "david",
    id: 7,
    avatarImg: require("../../../assets/images/avatar_7.png"),
  }, {
    name: "david",
    id: 8,
    avatarImg: require("../../../assets/images/avatar_8.png"),
  }, {
    name: "david",
    id: 9,
    avatarImg: require("../../../assets/images/avatar_9.png"),
  },]

  const { onGetPosts, posts, isShowingOldPosts, setIsShowingOldPosts } = usePostContext();
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      await onGetPosts({ loadOldPosts: isShowingOldPosts });
    };
    getPosts();
  }, []);

  useEffect(() => {
  }, [posts])


  const handleLoadOlderPosts = async () => {
    setIsShowingOldPosts(true)
    setIsLoadingPosts(true);
    await onGetPosts({ loadOldPosts: true });
    setIsLoadingPosts(false);
  };

  const renderLoadMoreButton = () => {
    if (posts.length === 0 && !isShowingOldPosts) {
      return (
        <TouchableOpacity onPress={handleLoadOlderPosts} disabled={isLoadingPosts} style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>
            No new posts available. Load older posts?
          </Text>
        </TouchableOpacity>
      );
    } else if (isShowingOldPosts) {
      return (
        <Text style={styles.noPostsText}>No more posts available</Text>
      );
    }
    return null;
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const isNearBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isNearBottom) {
      console.log('Reached near the bottom of the list');
    }
  };



  return (
    <View style={styles.container}>
      <IOScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View>
          <ScrollView horizontal >
            <View style={styles.storiesContainer}>
              {storiesProile.map((profile: StoriesProfile) => {
                return <StoryProfile key={profile.id} id={profile.id} name={profile.name} avatarImg={profile.avatarImg} />
              })}
            </View>
          </ScrollView>

          <View style={styles.postContainer}>
            {isLoadingPosts ? (
              <ActivityIndicator />
            ) : (
              <>
                {posts && posts.map((post: PostResponse) => (
                  <PostHome post={post} key={post?.id} />
                ))}
                {renderLoadMoreButton()}
              </>
            )}
          </View>
        </View>
      </IOScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  },
  storiesContainer: {
    width: "auto",
    flexDirection: "row",
    gap: 20,
    height: 120,
  },
  postContainer: {
    width: "auto",
    flex: 4,
    overflow: "scroll",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noPostsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  loadMoreButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  loadMoreText: {
    color: '#fff',
    fontSize: 16,
  }
});
