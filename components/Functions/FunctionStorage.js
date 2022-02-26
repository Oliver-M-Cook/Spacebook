import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getProfilePicture(userID) {
	const token = await AsyncStorage.getItem('@session_token')
	return fetch(
		'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/photo'),
		{
			method: 'GET',
			headers: {
				'X-Authorization': token,
			},
		}
	)
		.then((response) => {
			if (response.status === 200) {
				return response.blob()
			} else if (response.status === 401) {
				this.props.navigation.navigate('Main Menu')
			} else if (response.status === 404) {
				throw 'Not Found'
			} else {
				throw 'Something went wrong'
			}
		})
		.then((resblob) => {
			const imageURI = URL.createObjectURL(resblob)
			return imageURI
		})
		.catch((error) => {
			console.log(error)
		})
}

export async function addFriend(userID) {
	const token = await AsyncStorage.getItem('@session_token')
	return fetch(
		'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/friends'),
		{
			method: 'POST',
			headers: {
				'X-Authorization': token,
			},
		}
	)
		.then((response) => {
			if (response.status === 200 || response.status === 201) {
				return 'Added Friend'
			} else if (response.status === 401) {
				this.props.navigation.navigate('Main Menu')
			} else if (response.status === 403) {
				throw 'User is already added as friend'
			} else if (response.status === 404) {
				throw 'Not Found'
			} else {
				throw 'Something went wrong'
			}
		})
		.catch((error) => {
			console.log(error)
		})
}

export async function getFriendRequests() {
	const token = await AsyncStorage.getItem('@session_token')
	return fetch('http://localhost:3333/api/1.0.0/friendrequests', {
		method: 'GET',
		headers: {
			'X-Authorization': token,
		},
	})
		.then((response) => {
			if (response.status === 200) {
				return response.json()
			} else if (response.status === 401) {
				this.props.navigation.navigate('Main Menu')
			} else {
				throw 'Something went wrong'
			}
		})
		.catch((error) => {
			console.log(error)
		})
}

export async function acceptFriendRequest(userID) {
	const token = await AsyncStorage.getItem('@session_token')
	return fetch(
		'http://localhost:3333/api/1.0.0/friendrequests/'.concat(userID),
		{
			method: 'POST',
			headers: {
				'X-Authorization': token,
			},
		}
	)
		.then((response) => {
			if (response.status === 200 || response.status === 201) {
				console.log('Accepted')
			} else if (response.status === 401) {
				this.props.navigation.navigate('Main Menu')
			} else if (response.status === 404) {
				throw 'Not Found'
			} else {
				throw 'Something went wrong'
			}
		})
		.catch((error) => {
			console.log(error)
		})
}

export async function rejectFriendRequest(userID) {
	const token = await AsyncStorage.getItem('@session_token')
	return fetch(
		'http://localhost:3333/api/1.0.0/friendrequests/'.concat(userID),
		{
			method: 'DELETE',
			headers: {
				'X-Authorization': token,
			},
		}
	)
		.then((response) => {
			if (response.status === 200) {
				console.log('Rejected')
			} else if (response.status === 401) {
				this.props.navigation.navigate('Main Menu')
			} else if (response.status === 404) {
				throw 'Not Found'
			} else {
				throw 'Something went wrong'
			}
		})
		.catch((error) => {
			console.log(error)
		})
}

export async function getFriends(userID) {
	const token = await AsyncStorage.getItem('@session_token')
	return fetch(
		'http://localhost:3333/api/1.0.0/user/'.concat(userID, '/friends'),
		{
			method: 'GET',
			headers: {
				'X-Authorization': token,
			},
		}
	)
		.then((response) => {
			if (response.status === 200) {
				return response.json()
			} else if (response.status === 401) {
				this.props.navigation.navigate('Main Menu')
			} else if (response.status === 403) {
				throw 'Can only view the friends of yourself or your friends'
			} else if (response.status === 404) {
				throw 'Not Found'
			} else {
				throw 'Something went wrong'
			}
		})
		.catch((error) => {
			console.log(error)
		})
}
