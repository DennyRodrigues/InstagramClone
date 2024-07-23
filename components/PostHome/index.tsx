import * as React from 'react';
import { ViewProps, View, StyleProp, ViewStyle, Pressable, useColorScheme, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, IconButton, Text, Title } from 'react-native-paper';
import MoreHorizontal from '@/assets/icons/moreHorizontal.svg';
import Heart from '@/assets/icons/heart.svg';
import Comment from '@/assets/icons/comments.svg';
import Send from '@/assets/icons/send.svg';
import Bookmark from '@/assets/icons/bookmark.svg';
import { Ionicons, Octicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { PostResponse } from '@/types/post';
import { BASE_API_URL } from '@/constants/Envs';
import { router } from 'expo-router';

type PostHomeProps = {
  post: PostResponse;
};


const PostHome = ({ post: { authorUsername, images, likesCount, description, authorProfile } }: PostHomeProps) => {
  console.log(`${BASE_API_URL}/${images[0]}`)
  return (
    <Card style={{ backgroundColor: 'black', padding: 0, borderRadius: 0 }}>
      <View style={{ marginBottom: 5, paddingRight: 12, paddingLeft: 12, flexDirection: 'row' }}>
          <TouchableOpacity style={{ flexDirection: 'row', marginRight: 'auto', gap: 10, alignItems: 'center' }} onPress={() => router.navigate(`/profile/${authorUsername}`)}>
            <Avatar.Image size={32} source={require('../../assets/images/avatarSnuffle.png')} />
            <Text style={{ fontWeight: 700, padding: 0, color: '#fff' }} >
              {authorUsername}
            </Text>
          </TouchableOpacity>
          <IconButton style={{ padding: 0, margin: 0 }}
            icon={({ size, color }) => (
              <MoreHorizontal
              />
            )}
            size={24}
            onPress={() => console.log('Pressed')}
          />
      </View>
      <Card.Cover source={{ uri: `${BASE_API_URL}/${images[0]}` }} style={{ margin: 0, height: 390, resizeMode: "center", borderRadius: 0 }} />
      <Card.Actions style={styles.cardActions}>
        <IconButton
          borderless
          style={{ backgroundColor: 'none', borderWidth: 0, margin: 0, }}
          icon={() => (
            <Heart />
          )}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          borderless
          style={{ backgroundColor: 'none', margin: 0, }}
          icon={() => (
            <Comment />
          )}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          borderless
          style={{ backgroundColor: 'none', margin: 0, }}
          icon={() => (
            <Send />
          )}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          borderless
          style={{ backgroundColor: 'none', margin: 0, marginLeft: "auto" }}
          icon={() => (
            <Bookmark />
          )}
          onPress={() => console.log('Pressed')}
        />
      </Card.Actions>
      <Card.Content style={{ display: 'flex', width: "100%", padding: 0, margin: 0, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Text variant="bodyMedium" style={{ fontWeight: 700 }}>{likesCount} Likes</Text>
        <Text variant="bodyMedium">{description} </Text>
        <Button mode="text" onPress={() => console.log('Pressed')} textColor='#6E6E6E' style={{ padding: 0, marginLeft: -10, alignSelf: 'flex-start', }} >
          View all 16 comments
        </Button>
      </Card.Content>

    </Card >
  )
};

export default PostHome;

const styles = StyleSheet.create({
  cardActions: {
    display: 'flex',
    flex: 1,
    width: "100%",
    marginRight: 'auto',
    justifyContent: 'space-between',
    padding: 0,
    paddingTop: 6,

  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
