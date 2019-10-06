import React from "react";
import { View, Text, Button } from "react-native";
import {getUser} from "./AsyncStorageHandler";

class HomeScreen extends React.Component {
  async componentDidMount() {
    const user = await getUser();
    if(user) this.props.navigation.navigate('RSVP')
  }

  render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Welcome to RSVP</Text>
                <Button
                    title="Sign Up!"
                    onPress={() => this.props.navigation.navigate('SignUp')}
                />
                <Button
                    title="Log In"
                    onPress={() => this.props.navigation.navigate('LogIn')}
                />
            </View>
        );
    }
}



export default HomeScreen