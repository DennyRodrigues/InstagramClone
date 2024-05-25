import React  from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { AntDesign, Entypo, Feather, Foundation, Ionicons, Octicons } from '@expo/vector-icons';
import { View } from '@/components/Themed';
import PlusSquare from "../../assets/icons/plus-square.svg";
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Instagram',
          tabBarIcon: ({ color }) => <Foundation name="home" color={color} size={24} />,
          headerRight: () => (
            <View style={styles.topRightContainer}>
              <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Octicons
                    name="heart"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                )}
              </Pressable>
            </Link><Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <AntDesign
                      name="message1"
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                  )}
                </Pressable>
              </Link>
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <PlusSquare
                      width={25}
                      height={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
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
          title: 'Serch',
          tabBarIcon: ({ color }) => <Foundation name="magnifying-glass" size={20} color={color} />,
        }}
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
