import * as React from 'react';
import { View, useColorScheme, StyleSheet, TouchableOpacity, } from 'react-native';
import { Avatar, Icon, Text } from 'react-native-paper';

type ButtonProps = {
  text: string;
  leftIcon: () => React.ReactElement;
    rightIcon: () => React.ReactElement;
};


export const ButtonWithIcons = ({ text, leftIcon, rightIcon }: ButtonProps) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.leftContainer}>
        {leftIcon()}

        <Text style={styles.text}>
          {text}
        </Text>
      </View>
      {rightIcon()}
    </TouchableOpacity>

  )
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10, 
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,

  },
});
