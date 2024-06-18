import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'New Post',
          headerBackVisible: true, 
        }}
      />
    </Stack>
  );
};
export default Layout;
