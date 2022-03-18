import React, { useRef } from 'react'
import { Camera } from 'expo-camera'
import { useState } from 'react/cjs/react.development'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { uploadPicture } from './Functions/UserManagement'
import { useFocusEffect } from '@react-navigation/native'
import CustomHeader from './CustomHeader'

const CameraScreen = (props) => {
  // Sets the states that will be used
  const [hasPermission, setHasPermission] = useState(null)
  const [type] = useState(Camera.Constants.Type.back)
  const [cameraOn, setCameraOn] = useState(false)

  const cameraRef = useRef(null)

  // This is called when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      const setup = async () => {
        const { status } = await Camera.getCameraPermissionsAsync()
        setHasPermission(status === 'granted')
        setCameraOn(true)
      }

      setup()

      return setCameraOn(false)
    }, [])
  )

  // Takes the picture and sends it to uploadPicture
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

  // Checks if the app has permission to use the camera and renders screen
  if (hasPermission) {
    if (cameraOn) {
      return (
        <View style={styles.container}>
          <CustomHeader />
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
      return null
    }
  } else {
    return (
      <View>
        <CustomHeader />
        <Text>No access to camera</Text>
      </View>
    )
  }
}

// Style sheet holds all the styles that are used
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
