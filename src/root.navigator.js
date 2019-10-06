import {createAppContainer, createStackNavigator} from "react-navigation";
import HomeScreen from "./HomeScreen";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Profile from "./ProfileScreen";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import RSVP from "./RSVP";
import CreateEventScreen from "./CreateEventScreen";
import EventListScreen from "./EventListScreen";
import EventDetails from "./EventDetails";
import MyEventsScreen from "./MyEventsScreen";
import MyEventDetails from "./MyEventDetails";

const AppNavigator = createStackNavigator({
    HomeScreen,
    SignUp,
    LogIn,
    Profile,
    EditProfile,
    ChangePassword,
    CreateEventScreen,
    EventListScreen,
    RSVP,
    EventDetails,
    MyEventsScreen,
    MyEventDetails
  },
  {
    initialRouteName: "HomeScreen"
  }
);

export default createAppContainer(AppNavigator);