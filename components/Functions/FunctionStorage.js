import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getProfilePicture(userID) {
  let token = await AsyncStorage.getItem("@session_token");
  return fetch(
    "http://192.168.1.31:3333/api/1.0.0/user/".concat(userID, "/photo"),
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
