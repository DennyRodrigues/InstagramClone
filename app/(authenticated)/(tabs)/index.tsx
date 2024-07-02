import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { StoryProfile } from '@/components/StoryProfile';
import PostHome from '@/components/PostHome';
import { StoriesProfile } from '@/types/story';
import { usePostContext } from '@/providers/post';
import { useEffect, useState } from 'react';
import { PostResponse } from '@/types/post';




export default function TabOneScreen() {

  const [posts, setPosts] = useState<PostResponse[]>([])
  const storiesProile: StoriesProfile[] = [{
    name: "david",
    id: 0
  },
  {
    id: 1,
    name: "david"
  }, {
    name: "david",
    id: 2
  }, {
    name: "david",
    id: 3
  }, {
    name: "david",
    id: 4
  }, {
    name: "david",
    id: 5
  }, {
    name: "david",
    id: 7
  }, {
    name: "david",
    id: 8
  }, {
    name: "david",
    id: 9
    },]
  
  const { onGetPosts } = usePostContext();

  useEffect(() => {
    const getPosts = async () => {
      const posts = await onGetPosts()
      console.log('posts', posts)
      setPosts(posts)
    }
    getPosts();
  }, [onGetPosts])


  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <ScrollView horizontal >
            <View style={styles.storiesContainer}>


              {storiesProile.map((profile: StoriesProfile) => {
                return <StoryProfile key={profile.id} id={profile.id} name={profile.name} />
              })}
            </View>

          </ScrollView>



          <View style={styles.postContainer}>
            {posts && posts.map(({ description, images, id, likesCount, }: PostResponse) => { return <PostHome likesCount={likesCount} description={description} images={images} key={id} /> })}

          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
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
