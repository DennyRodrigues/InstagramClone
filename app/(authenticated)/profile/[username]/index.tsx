import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { ProfileHeader } from '@/components/ProfileHeader';
import { ActivityIndicator, Appbar, Avatar, IconButton, SegmentedButtons } from 'react-native-paper';
import Add from '@/assets/icons/add.svg';
import Menu from '@/assets/icons/menu.svg';
import Gallery from '@/assets/icons/galery.svg';
import { Button } from '@/components/Button';
import { StoryProfile } from '@/components/StoryProfile';
import { StoriesProfile } from '@/types/story';
import { useEffect, useState } from 'react';
import { storiesProfileMock } from '@/mocks/stories';
import { useProfileContext } from '@/providers/profile';
import { usePathname, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { FollowService } from '@/services/follow';


export default function Profile() {
  const pathname = usePathname();
  const [username, setUsername] = useState('');
  const [value, setValue] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const { onGetProfile, profileInfo } = useProfileContext()

  useEffect(() => {
    const currentUsername = pathname.split("/").pop();
    setUsername(currentUsername || "");
  }, [pathname]);




  useEffect(() => {
    const fetchProfile = async () => {
      if (username) {
        console.log(username); // This will only log when username changes
        await onGetProfile(username);
        console.log(profileInfo);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  if (!profileInfo) {
    return <View style={styles.container}>
      <ActivityIndicator />
    </View>
  }

  const followUser = async () => {
    const response = await FollowService.addFollow(profileInfo.id);
    console.log(response.data)
    if (response.data) {
      setIsFollowing(true)
    }
  }
  const unfollowUser = async () => {
    console.log('FEATURE NOT IMPLEMENTED')
    setIsFollowing(false)
  }
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
      <ProfileHeader profileInfo={profileInfo} />
      <View>
        <Text>{profileInfo.username}</Text>
        <Text>Category</Text>
        <Text>{profileInfo.bio}</Text>
      </View>
      <View style={styles.followedContainer}>
        <View style={styles.followedImagesContainer}>
          <Avatar.Image size={35} source={require('@/assets/images/avatarSnuffle.png')} />
          <Avatar.Image size={35} source={require('@/assets/images/avatarSnuffle.png')} style={styles.followedImages} />
          <Avatar.Image size={35} source={require('@/assets/images/avatarSnuffle.png')} style={styles.followedImages} />
        </View>
        <Text>Followed by username, username
          and 100 others</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {isFollowing ?
          <Button text={"Following"} onPress={unfollowUser}>
          </Button> :
          <Button text={"Follow"} variant={'primary'} onPress={followUser}>
          </Button>}
        <Button text={"Message"} >
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
      <View style={styles.postContainer}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

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

  },
  postContainer: {

  }
});
