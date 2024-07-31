import React  from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack, Tabs } from 'expo-router';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { AntDesign, Entypo, Feather, Foundation, Ionicons, Octicons } from '@expo/vector-icons';
import { View } from '@/components/Themed';
import Home from '../../assets/icons/home.svg';
import Heart from "../../assets/icons/heart.svg";
import Message from "../../assets/icons/message.svg";
import Add from "../../assets/icons/add.svg";
import Profile from "../../assets/icons/profile.svg";
import Reels from "../../assets/icons/reels.svg";
import Search from '../../assets/icons/search.svg';
import Menu from '@/assets/icons/menu.svg';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};
export default Layout;

const styles = StyleSheet.create({
  topRightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
