import { Image, ScrollView, StyleSheet } from 'react-native';
import {  View } from '@/components/Themed';
import { StoryProfile } from '@/components/StoryProfile';
import PostHome from '@/components/PostHome';
import { StoriesProfile } from '@/types/story';
import { useState } from 'react';
import { useAuth } from '@/providers/auth';
import { Button, Icon, Text, TextInput } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useError } from '@/providers/error';
import { CustomErrorType } from '@/config/CustomError';




export default function Index() {
  const { showError } = useError();
  const { onLogin, } = useAuth();
  const [email, setEmail] = useState('david@gmail.com');
  const [password, setPassword] = useState('123');

  const handleLogin = async () => {
    try {
      await onLogin(email, password)
    } catch (e: any) {
      const error: CustomErrorType = e;
      const errorMessage = error.message;
      if (errorMessage.includes('Bad Credentials')) {
        showError('Bad Credentials. Email or password are incorrect.');
      } else {
        showError(`Login failed. Please try again, error message: ${errorMessage}`);
      }
    }

  }


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("@/assets/images/logo.png")} resizeMode="contain" style={{ overflow: 'hidden', width: 174, }} />
      </View>
      <View style={styles.inputContainer}>


        <TextInput
          label="Email"
          testID={"email-input"}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          label="Password"
          testID={"password-input"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          right={<Icon source="eye" size={12}/>}
        />
      </View>
      <Button mode='contained' style={{ borderRadius: 4 }} onPress={handleLogin} testID={"log-in-button"}>
        Log In
      </Button>
      <Button style={{ borderRadius: 4 }} onPress={() => router.push('onboarding/register')} testID={"sign-up-button"}>
          Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    width: "100%",
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  inputContainer: {
    gap: 10,
    marginBottom: 50,
  }
});
