import { usePushNotifications } from '@/hooks/useNotification';
import { useAuth } from '@/providers/auth';
import { profileService } from '@/services/profile';
import { Redirect, Stack } from 'expo-router';
import { useEffect } from 'react';


export default function AppLayout() {

  const { authState } = useAuth();
  const { expoPushToken, notification } = usePushNotifications();
  
  useEffect(() => {
    if (!authState.authenticated) {
      return
    }
    if (expoPushToken) {
      profileService.saveNotificationToken(expoPushToken.data)
    }
  }, [authState.authenticated, expoPushToken])



  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!authState.authenticated) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/onboarding" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <AuthenticatedApp />;
}

function AuthenticatedApp() {

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="newPost" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
}

