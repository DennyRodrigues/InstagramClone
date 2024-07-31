import { Profile } from '@/types/profile';
import * as React from 'react';
import { View, useColorScheme, StyleSheet, } from 'react-native';
import { Avatar, Text } from 'react-native-paper';


interface ProfileHeaderProps {
  profileInfo: Profile;
}


export const ProfileHeader = ({ profileInfo: {  followers, following } }: ProfileHeaderProps) => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <Avatar.Image size={80} source={require('../../assets/images/avatarSnuffle.png')} />
      <View style={styles.textContainer}>
        <View style={styles.textInsideContainer}>
          <Text style={{fontWeight: 700}}>1,2543</Text>
          <Text >Posts </Text>
        </View>
        <View style={styles.textInsideContainer}>
          <Text style={{ fontWeight: 700 }}>{followers.length}</Text>
          <Text >Followers</Text>
        </View>
        <View style={styles.textInsideContainer}>
          <Text style={{ fontWeight: 700 }}>{following.length}</Text>
          <Text>Following</Text>
        </View>
      </View>
    </View>
    
  )
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 24,
  },
  textInsideContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
