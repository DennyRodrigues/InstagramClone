import { Stack } from 'expo-router';

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
