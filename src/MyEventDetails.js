import React from "react";
import {Button, Text, View, SafeAreaView, Picker} from "react-native";
import {getUser, getEvents} from "./AsyncStorageHandler";
import AsyncStorage from "@react-native-community/async-storage";

class MyEventDetails extends React.Component {
  state = {
    // dish: '',
    event: {

    },
    setting: '',
  };

  async componentDidMount(): void {
    const event = this.props.navigation.getParam('event');
    this.setState({event});
  }

  handleFood (){
    return this.state.event.activities.map(food =>{
      return<Text key={food}>Meal: {food}</Text>
    })};

  handleActivity (){
    return this.state.event.activities.map(activity =>{
      return<Text key={activity}>Activities: {activity}</Text>
    })};



  handleDeRegisterEvent = async () => {
    const {responses} = this.state.event;
    console.log(responses);
    const user = await getUser();
    responses.findIndex(response => {
      if (response.user === user.firstName) {
        response.response = false;
      }
    });

    user.events.findIndex(event => {
      if (event.title === this.state.event.title) {
        user.events.splice(event, 1)
      }
    });
    console.log('responses', responses);
    console.log('user events', user.events);

    // const event = this.state.event;
    //
    // user.events.push(event);
    // console.log('user', user);
    // console.log('response', this.state.event.responses);
    //
    const index = this.props.navigation.getParam('index');
    const newEvents = await getEvents();
    newEvents[index] = this.state.event;


    //
    try {
      await AsyncStorage.setItem('events', JSON.stringify(newEvents));
      await AsyncStorage.setItem('user', JSON.stringify(user));
      alert('Event Deleted');
      this.props.navigation.navigate('RSVP')
    } catch (e) {
      console.log(e);
    }
  };


  render() {
    const {event} = this.state;
    console.log();
    return (
      <SafeAreaView style={{flex: 1 }}>
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          {Object.keys(event).map(eventKey => {
            if (eventKey === 'password' || eventKey === 'responses')
              return null;
            else if (eventKey === 'location') {
              return(
                <View key={eventKey}>
                  <Text> House Number: {event[eventKey]['houseNumber']}</Text>
                  <Text>Street: {event[eventKey]['street']}</Text>
                  <Text>City: {event[eventKey]['city']}</Text>
                </View>
              )}
            else if(eventKey === 'activities' ){
              return (
                <View key={eventKey}>
                  {this.handleActivity()}
                </View>
              )
            }
            else if (eventKey === 'food'){
              return (
                <View key={eventKey}>
                  {this.handleFood()}
                </View>
              )
            }
            else
              return(
                <Text key={eventKey}> {eventKey}: {event[eventKey]}</Text>
              )
          })}

        </View>
        <Button
          title={'Delete Event'}
          onPress={this.handleDeRegisterEvent}/>

      </SafeAreaView>
    );
  }
}

export default MyEventDetails;