import { Camera, CameraType, CameraView, CameraViewRef, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import {  StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';

export default function AddPost() {
  const [facing, setFacing] = useState<CameraType>('back') ;
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);

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

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    console.log(image);
  };

  const takePicture = async () => {
    try {
      if (cameraRef?.current) {
        const data = await cameraRef.current.takePictureAsync();
        if (data) {
          setImage(data?.uri);
        }
        else {
          throw new Error("Not able to take Picture")
        }
        console.log(data);
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
      </View>

      <View style={styles.buttonContainer}> 
          <Button icon="camera" mode="contained" onPress={toggleCameraFacing}>
            Flip Image
          </Button>
          <Button icon="camera" mode="contained" onPress={takePicture}>
           Take Picture
        </Button>
        <Button icon="camera" mode="contained" onPress={pickImage}>
          gallery
        </Button>
        </View>

      {image && <Image source={{uri: image}} resizeMode="contain" style={{flex: 1, width: 200}} />}
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
    flexDirection: 'row',
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
    width: '100%',
    height: 70
  },
  buttonContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    width: "100%",
    gap: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
