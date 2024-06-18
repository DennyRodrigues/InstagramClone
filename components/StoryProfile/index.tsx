import React from 'react'
import { Avatar, Text, withTheme } from 'react-native-paper';
import { View } from '../Themed';
import { StyleSheet } from 'react-native';



type StoriesProfileProps = {
  id: number;
  name: string;
};


export const StoryProfile = ({ name, id }: StoriesProfileProps) => {
  return (
    <View style={styles.container} >
    <Avatar.Image
      key={id}
      size={56}
      source={require("../../assets/images/avatar.png")}
      />
      <Text >
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
});
