import React from "react";
import {Button, Text, TextInput, View} from "react-native";
import {getUser} from "./AsyncStorageHandler";
import AsyncStorage from "@react-native-community/async-storage";

class ChangePassword extends React.Component {
  state = {
    user: {}
  };

  async componentDidMount(): void {
    const value = await getUser();
    if(value) this.setState({oldPassword: (value.password)})
  }

  handleTextChange = (key, text) => {
    this.setState({user:{...this.state.user, [key]:text}})
  };

  handleSavePassword = async () => {
    let valid = true;
      if(this.state.oldPassword !== this.state.user.oldPassword)  valid = false;

    if(valid){

      try {
        delete this.state.user.oldPassword;
        await AsyncStorage.mergeItem('user', JSON.stringify(this.state.user));
        alert('Password changed successfully');
      } catch (e) {
        console.log(e);
      }
      this.props.navigation.navigate('Profile');
    }else{
      alert('wrong password!!!');
    }
  };


  render(){
    return(
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>You can change your password here</Text>
        <TextInput
          placeholder={'old password'}
          onChangeText={(text) => this.handleTextChange('oldPassword', text)}
          value={this.state.user.oldPassword}
          secureTextEntry
        />
        <TextInput
          placeholder={'new password'}
          onChangeText={(text) => this.handleTextChange('password', text)}
          value={this.state.user.password}
          secureTextEntry
        />
        <Button title={'Save Password'} onPress={this.handleSavePassword}/>
      </View>
    );
  }
}

export default ChangePassword;