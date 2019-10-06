import React from "react";
import {Button, Text, View} from "react-native";
import {getUser} from "./AsyncStorageHandler";

class Profile extends React.Component {
  state = {
    user: {}
  };

 async componentDidMount(): void {
   const value = await getUser();
  if(value) this.setState({user: (value)})
 }



  render() {
    const {firstName, lastName, email} = this.state.user;
    console.log(this.state.user);
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>First Name: {firstName}</Text>
        <Text>Last Name: {lastName}</Text>
        <Text>email: {email}</Text>
        <Button title={'Edit Profile'} onPress={()=>this.props.navigation.navigate('EditProfile')}/>
        <Button title={'Change Password'} onPress={()=>this.props.navigation.navigate('ChangePassword')}/>


      </View>


    );
  }
}

export default Profile;