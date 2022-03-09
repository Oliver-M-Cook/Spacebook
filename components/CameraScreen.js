import React, { useRef } from 'react'
import { Camera } from 'expo-camera'
import { useEffect, useState } from 'react/cjs/react.development'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { uploadPicture } from './Functions/UserManagement'
import { set } from 'react-native-reanimated'
import { useFocusEffect } from '@react-navigation/native'

const CameraScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [cameraOn, setCameraOn] = useState(false)

  const cameraRef = useRef(null)

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
    if (cameraOn) {
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
      return null
    }
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
