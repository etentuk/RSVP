import React from "react";
import {getUser} from "./AsyncStorageHandler";
import {Button, FlatList, Text, View} from "react-native";

class MyEventsScreen extends React.Component {
  state = {
    user: {},
    // isLoading: true,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({user})
  }

  render() {

      if (this.state.user.events?.length) {
        return (
          <FlatList
            keyExtractor={(item) => item.title}
            data={this.state.user.events}
            renderItem={({item, index}) =>(
              <View>
                <Text>Here are your currently registered events </Text>
                <Button
                  title={item.title}
                  onPress={() => this.props.navigation.navigate('MyEventDetails', {event: item, index} )}
                />
                <Text>{item.venue}</Text>
                <Text>{item.date}</Text>

              </View>
            )}
          />
        )
      } else {
        return (
          <Text>No events</Text>
        )
      }
    }

}

export default MyEventsScreen;
