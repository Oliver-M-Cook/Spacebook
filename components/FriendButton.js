import { Component } from 'react'
import { Button, Text, TouchableOpacity, View } from 'react-native'
import { addFriend } from './Functions/FunctionStorage'

class FriendButton extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoading: true,
		}
	}

	componentDidMount() {
		this.setState({
			isLoading: false,
		})
	}

	render() {
		if (!this.state.isLoading) {
			return (
				<TouchableOpacity
					onPress={() => addFriend(this.props.userID)}
					style={{ marginTop: 5 }}
				>
					<Text
						style={{
							backgroundColor: '#B4869F',
							padding: 10,
							textAlign: 'center',
							borderRadius: 10,
						}}
					>
						Add
					</Text>
				</TouchableOpacity>
			)
		} else {
			return (
				<View>
					<Text>Loading...</Text>
				</View>
			)
		}
	}
}

export default FriendButton
