import { Component } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import * as React from 'react'

class MainMenu extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.buttonStyle}>
          <Button
            style={styles.buttonStyle}
            title='Sign Up'
            onPress={() => this.props.navigation.navigate('Sign Up')}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button
            style={styles.buttonStyle}
            title='Login'
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonStyle: {
    padding: 10
  }
})

export default MainMenu
