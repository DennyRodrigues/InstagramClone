import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/providers/auth';
import { useError } from '@/providers/error';
import Colors from '@/constants/Colors';
import { Button, TextInput } from 'react-native-paper';
import CustomError, { CustomErrorType } from '@/config/CustomError';
import { err } from 'react-native-svg';

const RegisterScreen = () => {
  const { onRegister } = useAuth();
  const { showError } = useError();
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  const isFormComplete = useMemo(() => {
    return Object.values(userData).every(field => field.trim() !== '');
  }, [userData]);

  const handleRegister = async () => {
    try {
      await onRegister(userData);
    } catch (e: any) {
      const error: CustomErrorType = e;
      const errorMessage = error.message;
      console.log("error", error, errorMessage);
      if (errorMessage.includes('email already taken')) {
        showError('This email is already taken. Please use a different email address.');
      } else {
        showError(`Registration failed. Please try again, error message: ${errorMessage}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor={Colors.text}
        onChangeText={(value) => handleInputChange('firstname', value)}
        value={userData.firstname}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor={Colors.text}
        onChangeText={(value) => handleInputChange('lastname', value)}
        value={userData.lastname}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={Colors.text}
        onChangeText={(value) => handleInputChange('username', value)}
        value={userData.username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={Colors.text}
        onChangeText={(value) => handleInputChange('email', value)}
        value={userData.email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={Colors.text}
        onChangeText={(value) => handleInputChange('password', value)}
        value={userData.password}
      />
      <Button
        mode='contained'
        style={{ borderRadius: 4 }}
        onPress={handleRegister}
        disabled={!isFormComplete} // Disable the button if the form is incomplete
        testID={"register"}
      >
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.background, // Set background to black
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.text, // Set text color to white
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border, // Set border color to dark
    marginVertical: 10,
    borderRadius: 5,
    color: Colors.text, // Set input text color to white
  },
});

export default RegisterScreen;
