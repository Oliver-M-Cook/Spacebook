import React, { useRef } from 'react'
import { Camera } from 'expo-camera'
import { useEffect, useState } from 'react/cjs/react.development'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { uploadPicture } from './Functions/UserManagement'

const CameraScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)

  const cameraRef = useRef(null)

  useEffect(() => {
    async function getPermission() {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getPermission()
  }, [])

  const takePicture = async () => {
    if (cameraRef) {
      const options = {
        quality: 0.5,
        base64: true,
        onPictureSaved: (data) => uploadPicture(data)
      }
      await cameraRef.current.takePictureAsync(options)
    }
  }

  if (hasPermission) {
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => takePicture()}
            >
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    )
  } else {
    return <Text>No access to camera</Text>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    color: 'white'
  }
})

export default CameraScreen
