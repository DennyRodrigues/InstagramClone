import { ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Appbar, Avatar } from 'react-native-paper';
import { StoryProfile } from '@/components/StoryProfile';
import PostHome from '@/components/PostHome';


type StoriesProfile = {
  id: number,
  name: String;
}
export default function TabOneScreen() {
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
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.mainContainer}>
      <ScrollView horizontal >
        <View style={styles.storiesContainer}>


          {storiesProile.map((profile: StoriesProfile) => {
            return <StoryProfile key={profile.id} id={profile.id} name={profile.name} />
          })}
        </View>
        
        </ScrollView>



      <View style={styles.postContainer}>
          <PostHome/>
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
    overflow: "scroll",
  },
  mainContainer: {

  },
  storiesContainer: {
    width: "auto",
    flexDirection: "row",
    gap: 20,
    height: 120,
    overflow: "scroll",
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
