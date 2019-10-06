import AsyncStorage from '@react-native-community/async-storage';


export const  getUser =async ()=>{
  const user = await AsyncStorage.getItem('user');
  return JSON.parse(user);
};

export const  getEvents =async ()=>{
  const events = await AsyncStorage.getItem('events');
  return JSON.parse(events);
};

