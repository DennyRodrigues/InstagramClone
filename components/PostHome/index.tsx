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

const LeftContent = (props: any) => <Avatar.Image style={{ marginRight: 0, padding: 0 }} {...props} source={require('../../assets/images/avatarSnuffle.png')} />


const RightContent = (props: any) => <IconButton style={{ padding: 0, margin: 0 }} 
  icon={({ size, color }) => (
    <MoreHorizontal 
    />
  )}
  size={24}
  onPress={() => console.log('Pressed')}
/>

const PostHome = () => {
  const colorScheme = useColorScheme();
  return (
    <Card style={{ backgroundColor: 'black', padding: 0, borderRadius: 0 }}>
      <Card.Title title="Snuffle" titleStyle={{ fontWeight: 700, padding: 0, marginLeft: -5 }} left={LeftContent} right={RightContent} style={{ marginLeft: 0, marginBottom: 0, paddingRight: 10 }} />
      <Card.Cover source={require('../../assets/images/snuffle.png')} style={{ margin: 0, height: 390, resizeMode: "center",  borderRadius: 0 }} />
      <Card.Actions style={styles.cardActions}>
        <IconButton
          borderless
          style={{ backgroundColor: 'none', borderWidth: 0, margin: 0, }}
          icon={() => (
            <Heart width={28} height={28} />
          )}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          borderless
          style={{ backgroundColor: 'none', margin: 0, }}
          icon={() => (
            <Comment width={28} height={28}/>
          )}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          borderless
          style={{ backgroundColor: 'none', margin: 0, }}
          icon={() => (
            <Send width={28} height={28} />
          )}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          borderless
          style={{ backgroundColor: 'none', margin: 0, marginLeft: "auto"}}
          icon={() => (
            <Bookmark width={28} height={28}      />
          )}
          onPress={() => console.log('Pressed')}
          />
    </Card.Actions>
      <Card.Content style={{ display: 'flex', width: "100%", padding: 0, margin: 0, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Text variant="bodyMedium" style={{fontWeight: 700}}>100 Likes</Text>
        <Text variant="bodyMedium">Username Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt... more </Text>
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
