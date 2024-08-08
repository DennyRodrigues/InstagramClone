import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { ProfileHeader } from '@/components/ProfileHeader';
import { Appbar, Avatar, IconButton, SegmentedButtons } from 'react-native-paper';
import Add from '@/assets/icons/add.svg';
import Menu from '@/assets/icons/menu.svg';
import Gallery from '@/assets/icons/galery.svg';
import { Button } from '@/components/Button';
import { StoryProfile } from '@/components/StoryProfile';
import { StoriesProfile } from '@/types/story';
import { useState } from 'react';
import { storiesProfileMock } from '@/mocks/stories';

export default function Profile() {
  const username = "snuffy"
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ width: '100%', backgroundColor: 'parent' }}>
        <Appbar.Content title={username} />
        <Appbar.Action icon={() => (
          <Add width={28} height={28} />
        )}
          onPress={() => console.log('Pressed')}
        /> 
        <Appbar.Action icon={() => (
          <Menu width={28} height={28} />
        )}
          onPress={() => console.log('Pressed')}
        /> 
      </Appbar.Header>
      <ProfileHeader />
      <View>
        <Text>Username</Text>
        <Text>Category</Text>
        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt #hashtag</Text>
      </View>
      <View style={styles.followedContainer}>
      <View style={styles.followedImagesContainer}>
        <Avatar.Image size={35} source={require('@/assets/images/avatarSnuffle.png')}  />
          <Avatar.Image size={35} source={require('@/assets/images/avatarSnuffle.png')} style={styles.followedImages} />
          <Avatar.Image size={35} source={require('@/assets/images/avatarSnuffle.png')} style={styles.followedImages} />
       </View>
        <Text>Followed by username, username
          and 100 others</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button text={"Edit profile"}>
        </Button>
        <Button text={"Share profile"}>
        </Button>
      </View>
      <ScrollView horizontal >
      <View style={styles.storiesContainer}>
          {storiesProfileMock.map((profile: StoriesProfile) => {
          return <StoryProfile key={profile.id} id={profile.id} name={profile.name} />
        })}
        </View>
      </ScrollView>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              icon: () => (
                <Gallery />
              ),
              value: 'gallery'
            },
            {
              value: 'train',
              label: 'Transit',
            },
            { value: 'drive', label: 'Driving' },
          ]}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
    width: '100%',
    overflow: "scroll",
  },
  followedContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    paddingRight: 100,
  },
  followedImagesContainer: {
    flexDirection: 'row',
  },
  followedImages: {
    margin: 0,
    marginLeft: -15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  storiesContainer: {
    width: "auto",
    flexDirection: "row",
    gap: 20,
    height: 120,
    overflow: "scroll",
  },
  safeAreaViewContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
