import React from "react";
import {Text, View, TextInput, Button} from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class SignUp extends React.Component {
  state = {
    user : {
      firstName: 'wjfy',
      lastName: 'lhcwv',
      email: 'reap',
      password: '1234',
      events: []
    }
  };

  // async componentDidMount(){
  //   const user = JSON.parse(await AsyncStorage.getItem('user'));
  //   if(user) this.setState({user})
  // }

  handleTextChange = (key, text) => {
    this.setState({user:{...this.state.user, [key]:text}})
  };

  handleCreateAccount = async () => {
    let valid = true;
    Object.values(this.state.user).map(userDetail =>{
      if(!userDetail && this.state.user.events !== null)  valid = false
    });

    if(valid){
      try {
        const response = await axios.post('http://localhost:5000/users/add', this.state.user);
        console.log(response);
        if(response.data.success){
          await AsyncStorage.setItem("user", JSON.stringify(response.data.data));
        }
          // .then(res => console.log(res.data));
        alert('Account created successfully');
        this.setState({user:{firstName:''}})
      } catch (e) {
        console.log(e);
      }
      this.props.navigation.navigate('RSVP');
    }else{
      alert('No empty fields!!!');
    }
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text>We would like to get to know you</Text>
        {/*{this.state.user.firstName !== '' && <Text>Welcome back {this.state.user.firstName}</Text>}*/}
        {/*<Text>{firstName}</Text>*/}
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

        <TextInput
          placeholder={'password'}
          onChangeText={(text) => this.handleTextChange('password', text)}
          value={this.state.user.password}
          secureTextEntry
        />

        <Button title={'Create Account'} onPress={this.handleCreateAccount}/>
      </View>
    );
  }
}

export default SignUp;