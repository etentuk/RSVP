import React from "react";
import {Button, Text, TextInput, View} from "react-native";
import {getUser} from "./AsyncStorageHandler";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

class EditProfile extends React.Component {
  state = {
    user: {}
  };

  async componentDidMount(): void {
    const value = await getUser();
    if(value) this.setState({user: (value)})
  }

  handleTextChange = (key, text) => {
    this.setState({user:{...this.state.user, [key]:text}})
  };

  handleSaveChanges = async () => {
    // let valid = true;
    // Object.values(this.state.user).map(userDetail =>{
    //   if(!userDetail)  valid = false
    // });

    // if(valid){
      try {
        const response = await axios.post(`http://localhost:5000/users/update/${this.state.user._id}`, this.state.user);
        if(response.data.success){
          await AsyncStorage.setItem('user', JSON.stringify(this.state.user));
          alert(response.data.message);
        }else{
          alert(response.data.message);
        }
        // this.setState({user:{firstName:''}})
      } catch (e) {
        console.log(e);
      }
      this.props.navigation.navigate('Profile');
    };
    // else{
    //   alert('No empty fields!!!');
    // }
  // }


  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Please put in your new details</Text>
        <TextInput
          placeholder={'First Name'}
          onChangeText={(text) => this.handleTextChange('firstName', text)}
          value={this.state.user.firstName}
        />

        <TextInput
          placeholder={'Last Name'}
          onChangeText={(text) => this.handleTextChange('lastName', text)}
          value={this.state.user.lastName}
        />

        <TextInput
          placeholder={'email'}
          onChangeText={(text) => this.handleTextChange('email', text)}
          value={this.state.user.email}
        />
        <Button title={'Save Changes'} onPress={this.handleSaveChanges}/>

      </View>
    );
  }
}


export default EditProfile;