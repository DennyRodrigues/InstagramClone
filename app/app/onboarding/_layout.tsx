import React from 'react';
import {Stack, } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="register" />
    </Stack>
  );
};

export default Layout;
