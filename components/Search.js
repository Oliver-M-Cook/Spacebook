import { Component } from "react";
import { Text, View } from "react-native";

class Search extends Component {
  render() {
    console.log(this.props.route.params.output);
    return (
      <View>
        <Text>{this.props.route.params.output}</Text>
      </View>
    );
  }
}

export default Search;
