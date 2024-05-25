import * as React from 'react';
import { ViewProps, View, StyleProp, ViewStyle, Pressable, useColorScheme, StyleSheet, Image } from 'react-native';
import { Avatar, Button, Card, IconButton, Text } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import MoreHorizontal from '@/assets/icons/moreHorizontal.svg';
import Heart from '@/assets/icons/heart.svg';
import Comment from '@/assets/icons/comments.svg';
import Send from '@/assets/icons/send.svg';
import Bookmark from '@/assets/icons/bookmark.svg';
import { Ionicons, Octicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const LeftContent = (props: any) => <Avatar.Image style={{ marginRight: 200, }} {...props} source={require('../../assets/images/avatarSnuffle.png')} />


const RightContent = (props: any) => <IconButton
  icon={({ size, color }) => (
    <MoreHorizontal
    />
  )}
  size={20}
  onPress={() => console.log('Pressed')}
/>

const PostHome = () => {
  const colorScheme = useColorScheme();
  return (
    <Card style={{ backgroundColor: 'black', padding: 0, borderRadius: 0 }}>
      <Card.Title title="Snuffle" subtitle="Sponsored" left={LeftContent} style={{ marginLeft: 0, marginBottom: 7, padding: 10 }} right={RightContent} />
      <Card.Cover source={require('../../assets/images/snuffle.png')} style={{ margin: 0, height: 390, resizeMode: "center",  borderRadius: 0 }} />
      <Card.Actions style={styles.cardActions}>
        <IconButton
          borderless
          style={{ backgroundColor: 'none', borderWidth: 0, margin: 0, }}
          icon={() => (
            <Heart width={30} height={30} />
          )}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          borderless
          style={{ backgroundColor: 'none', margin: 0, }}
          icon={() => (
            <Comment width={30} height={30}/>
          )}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          borderless
          style={{ backgroundColor: 'none', margin: 0, }}
          icon={() => (
            <Send width={30} height={30} />
          )}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          borderless
          style={{ backgroundColor: 'none', margin: 0, marginLeft: "auto"}}
          icon={() => (
            <Bookmark width={30} height={30}      />
          )}
          onPress={() => console.log('Pressed')}
          />
    </Card.Actions>
      <Card.Content>
      <Text variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">Card content</Text>
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
