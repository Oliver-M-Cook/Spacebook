import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

class CustomDrawerContent extends Component {
  logout = async () => {
    let token = await AsyncStorage.getItem("@session_token");
    await AsyncStorage.removeItem("@session_token");
    await AsyncStorage.removeItem("@user_id");
    return fetch("http:10.182.67.77:3333/api/1.0.0/logout", {
      method: "post",
      headers: {
        "X-Authorization": token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          this.props.navigation.navigate("Login");
        } else if (response.status === 401) {
          this.props.navigation.navigate("Login");
        } else {
          throw "Something went wrong";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <DrawerContentScrollView {...this.props}>
        <DrawerItemList {...this.props} />
        <DrawerItem label="Logout" onPress={this.logout} />
      </DrawerContentScrollView>
    );
  }
}

export default CustomDrawerContent;
