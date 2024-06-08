import * as React from 'react';
import { View, useColorScheme, StyleSheet, TouchableOpacity, } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

type ButtonProps = {
  text: String;
};


export const Button = ({ text }: ButtonProps) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>

  )
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexGrow: 1,
    borderRadius: 6,
    margin: 0,
    paddingBottom: 2,
    paddingTop: 0,
    height: 35,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: "#EFEFEF20",
  },
  text: {
    color: "#fff",
    
  },
});
