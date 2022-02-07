import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainMenu from "./components/MainMenu";
import SignUp from "./components/SignUp";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <MainMenu></MainMenu> */}
      <SignUp></SignUp>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
