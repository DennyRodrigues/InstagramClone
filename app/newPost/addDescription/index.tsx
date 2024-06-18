import { ButtonWithIcons } from "@/components/ButtonWithIcons";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Icon, TextInput } from "react-native-paper";

const Page = () => {



  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../../../assets/images/snuffle.png")} resizeMode="contain" style={styles.image} />
      </View>
      <TextInput placeholder="write a caption" contentStyle={{ backgroundColor: '#000', borderWidth: 0, height: 100 }} multiline></TextInput>
      <ButtonWithIcons text={"Add Location"} leftIcon={() =>
        <Icon source="map-marker-outline" size={24} />} rightIcon={() => <Icon source="chevron-right" size={24} />} />
      <ButtonWithIcons text={"Tag People"} leftIcon={() =>
        <Icon source="map-marker-outline" size={24} />} rightIcon={() => <Icon source="chevron-right" size={24} />} />
      <ButtonWithIcons text={"Add Music"} leftIcon={() =>
        <Icon source="map-marker-outline" size={24} />} rightIcon={() => <Icon source="chevron-right" size={24} />} />
      <View style={{ flex: 1, marginBottom: 20, }}>
        <Button mode="contained" onPress={() => console.log('Pressed')} style={{ marginTop: 'auto',}}>
          Share
        </Button>
      </View>
    </View>
  );
};

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  image: {
    overflow: 'hidden',
    width: '100%',
    height: 300
  },
});
