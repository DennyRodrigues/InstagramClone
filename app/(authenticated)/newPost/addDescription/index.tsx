import { ButtonWithIcons } from "@/components/ButtonWithIcons";
import { usePostContext } from "@/providers/post";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Icon, TextInput } from "react-native-paper";

const Page = () => {

  const { onCreatePost, selectedImage, onGetPosts } = usePostContext();
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateNewPost = async () => {
    setLoading(true);
    await onCreatePost(description)
    await onGetPosts();
    setLoading(false);
    router.navigate('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: selectedImage ? selectedImage : "" }} resizeMode="contain" style={styles.image} />
      </View>
      <TextInput placeholder="write a caption" contentStyle={{ backgroundColor: '#000', borderWidth: 0, height: 100 }} multiline value={description} onChangeText={setDescription}></TextInput>
      <ButtonWithIcons text={"Add Location"} leftIcon={() =>
        <Icon source="map-marker-outline" size={24} />} rightIcon={() => <Icon source="chevron-right" size={24} />} />
      <ButtonWithIcons text={"Tag People"} leftIcon={() =>
        <Icon source="map-marker-outline" size={24} />} rightIcon={() => <Icon source="chevron-right" size={24} />} />
      <ButtonWithIcons text={"Add Music"} leftIcon={() =>
        <Icon source="map-marker-outline" size={24} />} rightIcon={() => <Icon source="chevron-right" size={24} />} />
      <View style={{ flex: 1, marginBottom: 20, }}>
        <Button mode="contained" onPress={() => handleCreateNewPost()} loading={loading} disabled={loading} style={{ marginTop: 'auto',}}>
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
    marginTop: 20,
    paddingLeft: 15, 
    paddingRight: 15,
  },
  image: {
    overflow: 'hidden',
    width: '100%',
height: 260,
  },
});
