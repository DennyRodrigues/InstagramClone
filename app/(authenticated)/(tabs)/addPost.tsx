import { Camera, CameraType, CameraView, CameraViewRef, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, IconButton } from 'react-native-paper';
import { Link } from 'expo-router';
import { usePostContext } from '@/providers/post';

export default function AddPost() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);

  const { onSelectImage: onUpdateSelectedImage } = usePostContext();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>
          grant permission
        </Button>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) {
      return;
    }

    const imageUri = result.assets[0].uri;
    onUpdateSelectedImage(imageUri);
    setImage(imageUri);
  };

  const takePicture = async () => {
    try {
      if (cameraRef?.current) {
        const data = await cameraRef.current.takePictureAsync();
        if (!data) {
          throw new Error("Not able to take Picture")
        }
        const imageUri = data?.uri;
        setImage(imageUri);
        onUpdateSelectedImage(imageUri);
      }
    }
    catch (e) {
      console.log(e)
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer} >
        <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
        <IconButton icon="camera-flip" mode="contained" onPress={toggleCameraFacing} style={styles.flipButton} containerColor='#999' />
      </View>
      <View style={styles.buttonContainer}>
        <Button icon="camera" mode="contained" onPress={takePicture}>
          Take Picture
        </Button>
        <Button icon="image-multiple" mode="contained" onPress={pickImage}>
          Gallery
        </Button>
      </View>
      <View style={styles.imageContainer}>
        {image &&
          <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <View style={styles.nextButtonContainer}>
        <Link asChild href={'newPost/addDescription'}>

          <Button icon="arrow-right-bold" mode="contained" disabled={!image}>
            Next
          </Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cameraContainer: {
    flex: 1,
    margin: 0,
    height: 40,
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
    width: '100%',
  },
  flipButton: {
    width: 'auto',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
    opacity: 0.8,
    borderRadius: 100,
    padding: 5,
    height: 'auto',
    margin: 0,
  },
  imageContainer: {
    backgroundColor: "#555",
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    width: '100%',
    height: 70
  },
  buttonContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    width: "100%",
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  nextButtonContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    width: "100%",
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    padding: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
