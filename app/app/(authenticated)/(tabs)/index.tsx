import { ScrollView, StyleSheet } from 'react-native';
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

  const { onGetPosts, posts } = usePostContext();

  useEffect(() => {
    const getPosts = async () => {
      console.log('loading posts')
      await onGetPosts();
    }
    getPosts();
  }, [])


  return (
    <View style={styles.container}>
      <IOScrollView >
        <View>
          <ScrollView horizontal >
            <View style={styles.storiesContainer}>


              {storiesProile.map((profile: StoriesProfile) => {
                return <StoryProfile key={profile.id} id={profile.id} name={profile.name} avatarImg={profile.avatarImg} />
              })}
            </View>

          </ScrollView>



          <View style={styles.postContainer}>
            {posts && posts.map((post: PostResponse) => { return <PostHome post={post} key={post?.id} /> })}

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
    color:'#fff'
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

});
