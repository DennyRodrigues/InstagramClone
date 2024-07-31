import Colors from '@/constants/Colors';
import * as React from 'react';
import { View, useColorScheme, StyleSheet, TouchableOpacity, TouchableOpacityProps, } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

type ButtonProps = {
  text: string;
  variant?: "primary";
  onPress?: () => void | Promise<void>;
};


export const Button = ({ text, variant, onPress }: ButtonProps) => {
  if (variant === "primary") {
    return (
      <TouchableOpacity style={stylesPrimary.container} onPress={onPress}>
        <Text style={stylesDefault.text}>
          {text}
        </Text>
      </TouchableOpacity>

    )
  }
  return (
    <TouchableOpacity style={stylesDefault.container} onPress={onPress}>
      <Text style={stylesDefault.text}>
        {text}
      </Text>
    </TouchableOpacity>

  )
};


const stylesDefault = StyleSheet.create({
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

const stylesPrimary = StyleSheet.create({
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
    backgroundColor: Colors.blue,
  },
});
