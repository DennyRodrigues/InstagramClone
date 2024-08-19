import React from 'react'
import { Avatar, Text, withTheme } from 'react-native-paper';
import { View } from '../Themed';
import { StyleSheet } from 'react-native';
import { AvatarImageSource } from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage';



type StoriesProfileProps = {
  id: number;
  name: string;
  avatarImg: AvatarImageSource;
};


export const StoryProfile = ({ name, id, avatarImg }: StoriesProfileProps) => {
  return (
    <View style={styles.container} >
      <Avatar.Image
        key={id}
        size={56}
        source={avatarImg}
      />
      <Text style={styles.text} >
        {name}
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  }
});
