import React from "react";
import {Button, Text, View, SafeAreaView, Picker} from "react-native";
import {getUser, getEvents} from "./AsyncStorageHandler";
import AsyncStorage from "@react-native-community/async-storage";

class EventDetails extends React.Component {
  state = {
    dish: '',
    responded: false,
    index1: '',
    response: '',
    registered: false,
    event: {

    },
  };

  async componentDidMount(): void {
    const event = this.props.navigation.getParam('event');
    this.setState({event});

  }

  handleFood (){
    return (
      <>
      <Text>Please Select your dish</Text>
      <Picker
        selectedValue={this.state.dish}
        onValueChange={(itemValue) =>
          this.setState({dish: itemValue})
        }>
        {this.state.event.food.map(food => <Picker.Item key={food} label={food} value={food} /> )}
      </Picker>
      </>
  )};

  handleActivity (){
   return this.state.event.activities.map(activity =>{
    return<Text key={activity}>Activities: {activity}</Text>
  })};


  handleRegisterEvent = async () => {
    const user = await getUser();

    this.state.event.responses.findIndex(response => {
      this.state.responded = response.user === user.firstName;
    });
    this.index1= this.state.event.responses.findIndex(response => response.user === user.firstName);
    console.log(this.state.event.responses);


    if(this.state.responded){
      this.state.event.responses[(this.index1)].response= true;
    }else{
      this.state.response ={
        user: user.firstName,
        response: true,
        food:  this.state.dish,
      };
      this.state.event.responses.push(this.state.response);
    }


    user.events.findIndex(title => {
      if(title.title === this.state.event.title){
        this.state.registered = true;
      }
    });

    // if(this.state.event.responses)
      this.state.registered? console.log('already in events'): user.events.push(this.state.event);
    // console.log('response', this.state.event.responses);
    //
    const index = this.props.navigation.getParam('index');
    const newEvents = await getEvents();
    newEvents[index] = this.state.event;

      try {
        await AsyncStorage.setItem('events', JSON.stringify(newEvents));
        await AsyncStorage.setItem('user', JSON.stringify(user));
        this.state.registered? alert('This event has already been registered'): alert('Registration Complete!!');

      } catch (e) {
        console.log(e);
      }

     this.props.navigation.navigate('EventListScreen')

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
          title={'Register for Event'}
          onPress={this.handleRegisterEvent}

        />

      </SafeAreaView>
    );
  }
}

export default EventDetails;