import { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Feed from "./Feed";
import CustomDrawerContent from "./CustomDrawerContent";
import DrawerNavigator from "./navigators/DrawerNavigator";
import AuthStackNavigator from "./navigators/AuthStackNavigator";

const Drawer = createDrawerNavigator();

class Home extends Component {
  render() {
    return <DrawerNavigator />;
  }
}

export default Home;
