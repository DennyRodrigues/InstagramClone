import { Image, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { StoryProfile } from '@/components/StoryProfile';
import PostHome from '@/components/PostHome';
import { StoriesProfile } from '@/types/story';
import { useState } from 'react';
import { useAuth } from '@/providers/auth';
import { Button, Icon, TextInput } from 'react-native-paper';




export default function Index() {

  const [email, setEmail] = useState('david@gmail.com');
  const [password, setPassword] = useState('123');
  const { onLogin, onRegister } = useAuth();

  const handleLogin = async () => {
    onLogin(email, password)
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
