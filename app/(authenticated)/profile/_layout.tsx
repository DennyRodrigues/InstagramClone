import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[username]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};
export default Layout;
