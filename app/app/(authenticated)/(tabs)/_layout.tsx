import React  from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { AntDesign, Entypo, Feather, Foundation, Ionicons, Octicons } from '@expo/vector-icons';
import { View } from '@/components/Themed';
import Home from '@/assets/icons/home.svg';
import Heart from "@/assets/icons/heart.svg";
import Message from "@/assets/icons/message.svg";
import Add from "@/assets/icons/add.svg";
import Profile from "@/assets/icons/profile.svg";
import Reels from "@/assets/icons/reels.svg";
import Search from '@/assets/icons/search.svg';
import Menu from '@/assets/icons/menu.svg';
import { useAuth } from '@/providers/auth';


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { authState } = useAuth();

  if (authState) {
    
  }

  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          headerLeft: () => (
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require("@/assets/images/logo.png")} resizeMode="contain" style={{ overflow: 'hidden', width: 104, marginLeft: 14 }} />
            </View>
          ),
          tabBarIcon: ({ color }) => <Home />,
          headerRight: () => (
            <View style={styles.topRightContainer}>
              <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                    <Heart width={28} height={28} style={{ marginRight: 24, opacity: pressed ? 0.5 : 1 }} />
                )}
              </Pressable>
            </Link><Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Message width={28} height={28} style={{ marginRight: 24, opacity: pressed ? 0.5 : 1 }} />
                  )}
                </Pressable>
              </Link>
            </View>
            
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: '',
          tabBarIcon: () => <Search />,
        }}
      />
      <Tabs.Screen
        name="addPost"
        options={{
          header: () => null,
          title: '',
          tabBarIcon: () => <Add />,
        }}
      />
      <Tabs.Screen
        name="reels"
        options={{
          title: '',
          tabBarIcon: () => <Reels />,
        }}
      />
      <Tabs.Screen
        
        name="profile"
        options={{
          title: '',
          tabBarIcon: () => <Profile />,
        header: () => null}}
        
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  topRightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
