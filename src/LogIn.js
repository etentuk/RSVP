import React from "react";
import {Text, View, TextInput, Button} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

class LogIn extends React.Component {
  state ={
    user: {}
  };


  handleTextChange = (key, text) => {
    this.setState({user:{...this.state.user, [key]:text}})
  };

  handleLogIn = async () => {
    const response = await axios.post('http://localhost:5000/users/login', this.state.user);
    if(response.data.success) {
      await AsyncStorage.setItem("user", JSON.stringify(response.data.data));
      this.setState({user:{}});
      this.props.navigation.navigate('RSVP');
    }
    else
      alert(response.data.message);
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Please Put in your Details</Text>
        <TextInput
          placeholder={'email'}
          onChangeText={(text) => this.handleTextChange('email', text)}
          value={this.state.user.email}
        />

        <TextInput
          placeholder={'password'}
          onChangeText={(text) => this.handleTextChange('password', text)}
          value={this.state.user.password}
          secureTextEntry
        />

        <Button
          title="Log In"
          onPress={this.handleLogIn}
        />
      </View>
    );
  }
}

export default LogIn;