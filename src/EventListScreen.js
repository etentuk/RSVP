import React from "react";
import {Button, Text, View, FlatList} from "react-native";
import {getEvents} from "./AsyncStorageHandler";

class EventListScreen extends React.Component {
  state = {
    events: []
  };

  async componentDidMount(): void {
    const value = await getEvents();
    if(value) this.setState({events: value})
  }

  render() {
    // console.log('Events', this.state.events);
    if(this.state.events?.length){
      return(
        <FlatList
          keyExtractor={(item) => item.title}
          data={this.state.events}
          renderItem={({item, index}) =>(
            <View>
              <Text> </Text>
              <Button
                title={item.title}
                onPress={() => this.props.navigation.navigate('EventDetails', {event: item, index} )}
              />
              <Text>{item.venue}</Text>
              <Text>{item.date}</Text>

            </View>
          )}
        />
      )
    }else{
      return <Text>No Events</Text>
    }
  }
}

export default EventListScreen;