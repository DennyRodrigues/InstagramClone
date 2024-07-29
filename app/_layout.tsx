import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import { PaperProvider } from 'react-native-paper';
import { PostContextProvider } from '@/providers/post';
import { AuthContextProvider } from '@/providers/auth';
import { handleGlobalError } from '@/config/axios';
import { ProfileContextProvider } from '@/providers/profile';
import { usePushNotifications } from '@/hooks/useNotification';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'login',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
handleGlobalError();

export default function RootLayout() {
  
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <AppNavigation />;
}


const AppNavigation = () => {
  const colorScheme = useColorScheme();
  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthContextProvider>
          <ProfileContextProvider>
            <PostContextProvider>
              <RootLayoutNav />
            </PostContextProvider>
          </ProfileContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </PaperProvider>
  )
};


function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{
        headerShown: false,
      }} />
    </Stack>
  );
}

