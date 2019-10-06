import React from "react";
import {View, Text, Button, TextInput} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Slider from '@react-native-community/slider';
import {getEvents} from "./AsyncStorageHandler";
import DatePicker from 'react-native-datepicker'



let events = [];
class CreateEventScreen extends React.Component {
  state = {
    dish: '',
    activity: '',
    date: '',
    event: {
      title: 'Bash',
      date: '',
      type: 'bash',
      location: {
        name: 'janosi',
        houseNumber: '19',
        street: 'janosi',
        city: 'debrecen',
      },
      max: '',
      description: 'fun',
      password: '1234',
      food: ['eba'],
      activities: ['gbas gbos'],
      responses: [],
    }
  };


  handleTextChange = (key, text) => {
    this.setState({event:{...this.state.event, [key]:text}});
  };

  handleItemChange = (key, text) => {
    this.setState({...this.state, [key]:text});
  };


  handleLocationChange = (key, text) => {
    this.setState({event:{...this.state.event, location:{...this.state.event.location, [key]:text}}})
  };

  handleSlidingComplete = (value) => {
    this.setState({event:{...this.state.event, 'max': value}});
  };

  handleAddDish = (dish) =>{
    this.state.event.food.push(dish);
    alert('Successfully added ' + dish);
    this.setState( {...this.state, 'dish' : ''});
  };

  handleAddActivity= (activity) =>{
    this.state.event.activities.push(activity);
    alert('Successfully added ' + activity);
    this.setState({...this.state.event, 'activity' : ''});
  };

  handleCreateEvent = async () => {
    const oldEvents = await getEvents();
    events = oldEvents? [...oldEvents, this.state.event]: [this.state.event];
    try {
      await AsyncStorage.setItem('events', JSON.stringify(events));
      alert('Event created successfully');
      this.props.navigation.navigate('RSVP');
    } catch (error) {
      console.log(error)
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Welcome to the event planner!!!</Text>
        <Text>Please register below</Text>

        <TextInput
          placeholder={'Event Title'}
          onChangeText={(text) => this.handleTextChange('title', text)}
          value={this.state.event.title}
        />

        <DatePicker
          date={this.state.date}
          mode="date"
          placeholder="select date"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {this.setState({event:{...this.state.event, date: date}})}}
          />




          {/*<TextInput*/}
        {/*  placeholder={'Date(dd/mm/yy)'}*/}
        {/*  onChangeText={(text) => this.handleTextChange('date', text)}*/}
        {/*  value={this.state.event.date}*/}
        {/*/>*/}

        <TextInput
          placeholder={'Venue'}
          onChangeText={(text) => this.handleTextChange('venue', text)}
          value={this.state.event.venue}
        />

        <TextInput
          placeholder={'Type of party'}
          onChangeText={(text) => this.handleTextChange('type', text)}
          value={this.state.event.type}
        />

        <Text> </Text>
        <Text>Location Details</Text>
        <TextInput
          placeholder={'House Number'}
          onChangeText={(text) => this.handleLocationChange('houseNumber', text)}
          value={this.state.event.location.houseNumber}
        />
        <TextInput
          placeholder={'Street Name'}
          onChangeText={(text) => this.handleLocationChange('street', text)}
          value={this.state.event.location.street}
        />
        <TextInput
          placeholder={'City'}
          onChangeText={(text) => this.handleLocationChange('city', text)}
          value={this.state.event.location.city}
        />
        <Text> </Text>

        <Text> How many guests are you expecting?</Text>

        <Slider
          onValueChange={value=>this.setState({value})}
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={50}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          step={1}
          onSlidingComplete={this.handleSlidingComplete}
        />
        <Text>{this.state.value}</Text>

        <TextInput
          placeholder={'Description'}
          onChangeText={(text) => this.handleTextChange('description', text)}
          value={this.state.event.description}
        />

        <Text> </Text>
        <Text> What food are you serving? </Text>

        {/*<Text> {...this.state.event.food} </Text>*/}
        <Text>You have added</Text>
        {this.state.event.food.map(food=> <Text key={food}>{food}</Text>)}


        <TextInput
          placeholder={'Dish'}
          onChangeText={(text) => this.handleItemChange('dish', text)}
          value={this.state.dish}
        />
        <Button
          title='Add dish'
          onPress={()=>this.handleAddDish(this.state.dish)}
        />

        <Text> </Text>
        <Text> What activities are you holding? </Text>
        <Text>You have added</Text>
        {this.state.event.activities.map(activities=> <Text key={activities}>{activities}</Text>)}
        <TextInput
          placeholder={'activity'}
          onChangeText={(text) => this.handleItemChange('activity', text)}
          value={this.state.activity}
        />
        <Button
          title='Add activity'
          onPress={()=>this.handleAddActivity(this.state.activity)}
        />
        <Text> </Text>

        <TextInput
          placeholder={'password'}
          onChangeText={(text) => this.handleTextChange('password', text)}
          value={this.state.event.password}
          secureTextEntry
        />

        <Button
          title='Create Event'
          onPress={this.handleCreateEvent}
        />
      </View>
    );
  }
}



export default CreateEventScreen