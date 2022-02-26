import { Component } from 'react'
import { Image, Text, View } from 'react-native'
import FriendButton from './FriendButton'

class OtherUserProfile extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userData: {},
		}
	}

	componentDidMount() {
		console.log(this.props.route.params.userData)
		console.log(this.props.route.params.profilePicture)
		this.setState({
			userData: this.props.route.params.userData,
		})
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#DCD6F7' }}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						padding: 10,
						borderBottomWidth: 2,
						borderColor: '#985F6F',
					}}
				>
					<Image
						source={{ uri: this.props.route.params.profilePicture }}
						style={{
							width: 150,
							height: 150,
							borderWidth: 2,
							borderRadius: 75,
							borderColor: '#985F6F',
						}}
					/>
					<View
						style={{
							flexDirection: 'column',
							alignItems: 'center',
							flex: 1,
						}}
					>
						<Text>
							{this.state.userData.user_givenname +
								' ' +
								this.state.userData.user_familyname}
						</Text>
						<FriendButton userID={this.state.userData.user_id} />
					</View>
				</View>
			</View>
		)
	}
}

export default OtherUserProfile
