import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getProfilePicture(userID) {
  let token = await AsyncStorage.getItem("@session_token");
  return fetch(
    "http://localhost:3333/api/1.0.0/user/".concat(userID, "/photo"),
    {
      method: "GET",
      headers: {
        "X-Authorization": token,
      },
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return response.blob();
      } else if (response.status === 401) {
        this.props.navigation.navigate("Login");
      } else if (response.status === 404) {
        throw "Not Found";
      } else {
        throw "Something went wrong";
      }
    })
    .then((resblob) => {
      let imageURI = URL.createObjectURL(resblob);
      return imageURI;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function addFriend(userID) {
  let token = await AsyncStorage.getItem("@session_token");
  console.log(userID);
  return fetch(
    "http://localhost:3333/api/1.0.0/user/".concat(userID, "/friends"),
    {
      method: "POST",
      headers: {
        "X-Authorization": token,
      },
    }
  ).then((response) => {
    if (response.status === 200 || response.status === 201) {
      return "Added Friend";
    } else if (response.status === 401) {
      this.props.navigation.navigate("Login");
    } else if (response.status === 403) {
      throw "User is already added as friend";
    } else if (response.status === 404) {
      throw "Not Found";
    } else {
      throw "Something went wrong";
    }
  });
}
