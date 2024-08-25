import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, IconButton, Text } from 'react-native-paper';
import MoreHorizontal from '@/assets/icons/moreHorizontal.svg';
import Heart from '@/assets/icons/heart.svg';
import Comment from '@/assets/icons/comments.svg';
import Send from '@/assets/icons/send.svg';
import Bookmark from '@/assets/icons/bookmark.svg';
import { PostResponse } from '@/types/post';
import { BASE_API_URL } from '@/constants/Envs';
import { router } from 'expo-router';

type PostHomeProps = {
  post: PostResponse;
};

const PostHome: React.FC<PostHomeProps> = ({ post }) => {
  const { authorUsername, images, likesCount, description, id } = post;

  const handlePressProfile = () => {
    router.navigate(`/profile/${authorUsername}`);
  };

  const handlePressOptions = () => {
    console.log('Pressed');
  };

  return (
      <Card style={styles.card}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.profileContainer} onPress={handlePressProfile}>
            <Avatar.Image size={32} source={require('../../assets/images/avatarSnuffle.png')} />
            <Text style={styles.username}>{authorUsername}</Text>
          </TouchableOpacity>
          <IconButton
            style={styles.iconButton}
            icon={MoreHorizontal}
            size={24}
            onPress={handlePressOptions}
          />
        </View>
        <Card.Cover source={{ uri: `${BASE_API_URL}/${images[0]}` }} style={styles.image} />
        <Card.Actions style={styles.cardActions}>
          <IconButton
            borderless
            style={styles.actionIcon}
            icon={Heart}
            onPress={() => console.log('Pressed')}
          />
          <IconButton
            borderless
            style={styles.actionIcon}
            icon={Comment}
            onPress={() => console.log('Pressed')}
          />
          <IconButton
            borderless
            style={styles.actionIcon}
            icon={Send}
            onPress={() => console.log('Pressed')}
          />
          <IconButton
            borderless
            style={[styles.actionIcon, styles.bookmarkIcon]}
            icon={Bookmark}
            onPress={() => console.log('Pressed')}
          />
        </Card.Actions>
        <Card.Content style={styles.content}>
          <Text variant="bodyMedium" style={styles.likes}>{likesCount} Likes</Text>
          <Text variant="bodyMedium">{description}</Text>
          <Button mode="text" onPress={() => console.log('Pressed')} textColor='#6E6E6E' style={styles.commentsButton}>
            View all 16 comments
          </Button>
        </Card.Content>
      </Card>
  );
};

export default PostHome;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'black',
    padding: 0,
    borderRadius: 0,
  },
  header: {
    marginBottom: 5,
    paddingRight: 12,
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    marginRight: 'auto',
    gap: 10,
    alignItems: 'center',
  },
  username: {
    fontWeight: '700',
    color: '#fff',
  },
  iconButton: {
    padding: 0,
    margin: 0,
  },
  image: {
    margin: 0,
    height: 390,
    resizeMode: 'center',
    borderRadius: 0,
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
    paddingTop: 6,
  },
  actionIcon: {
    backgroundColor: 'none',
    borderWidth: 0,
    margin: 0,
  },
  bookmarkIcon: {
    marginLeft: 'auto',
  },
  content: {
    width: '100%',
    padding: 0,
    margin: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  likes: {
    fontWeight: '700',
  },
  commentsButton: {
    padding: 0,
    marginLeft: -10,
    alignSelf: 'flex-start',
  },
});
