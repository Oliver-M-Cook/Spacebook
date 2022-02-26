import { Component } from 'react'
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	FlatList,
} from 'react-native'
import { getFriendRequests } from './Functions/FunctionStorage'
import TopBar from './TopBar'
import { ScreenListeners } from '@react-navigation/native'

class RenderFlatListHeader extends Component {
	render() {
		return (
			<Text style={{ fontSize: 25, fontWeight: 'bold' }}>Friend Requests</Text>
		)
	}
}

class RenderFlatList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoading: true,
			friendRequestArray: [],
		}
	}

	componentDidMount() {
		getFriendRequests().then((responseJson) => {
			console.log(responseJson)
			this.setState({
				friendRequestArray: responseJson,
				isLoading: false,
			})
		})
	}

	componentWillUnmount() {
		this._unsubscribe()
	}

	render() {
		if (!this.state.isLoading) {
			return (
				<FlatList
					data={this.state.friendRequestArray}
					renderItem={({ item, index }) => (
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								flex: 1,
								margin: 10,
							}}
						>
							<Text>{item.first_name + ' ' + item.last_name}</Text>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'flex-end',
									flex: 1,
								}}
							>
								<TouchableOpacity>
									<Text
										style={{
											backgroundColor: '#00b33c',
											padding: 5,
											borderRadius: 10,
											marginRight: 15,
										}}
									>
										Accept
									</Text>
								</TouchableOpacity>
								<TouchableOpacity>
									<Text
										style={{
											backgroundColor: '#ff6666',
											padding: 5,
											borderRadius: 10,
										}}
									>
										Reject
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
					ListHeaderComponent={RenderFlatListHeader}
					StickyHeaderComponent={[0]}
					keyExtractor={(item) => item.user_id}
				/>
			)
		} else {
			return <Text>Loading...</Text>
		}
	}
}

class FriendRequests extends Component {
	render() {
		return (
			<View style={styles.container}>
				<TopBar navigation={this.props.navigation} />
				<View
					style={{
						borderBottomWidth: 2,
						borderColor: '#985F6F',
					}}
				>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate('Friends List')}
						style={{
							margin: 5,
							alignSelf: 'flex-start',
						}}
					>
						<Text
							style={{
								padding: 5,
								backgroundColor: '#B4869F',
								borderRadius: 10,
							}}
						>
							Your Friends
						</Text>
					</TouchableOpacity>
				</View>
				<RenderFlatList />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#DCD6F7',
	},
})
