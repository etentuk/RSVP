import React from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

class RSVP extends React.Component {
  // async componentDidMount() {
  //   if(user) this.props.navigation.navigate('Profile')
  // }
  handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      alert('You have been logged out');
    } catch (e) {
      console.log(e);
    }
    this.props.navigation.navigate('HomeScreen');
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Welcome to the home of events</Text>
        <Button
          title="Event List"
          onPress={() => this.props.navigation.navigate('EventListScreen')}
        />
        <Button
          title="Create Event"
          onPress={() => this.props.navigation.navigate('CreateEventScreen')}
        />
        <Button
          title="Profile Screen"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
        <Button
          title="My Events"
          onPress={() => this.props.navigation.navigate('MyEventsScreen')}
        />
        <Button
          title={'Log Out'}
          onPress={this.handleLogOut}
        />
      </View>
    );
  }
}



export default RSVP