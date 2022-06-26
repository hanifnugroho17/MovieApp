import React, {useEffect, useState} from 'react';
import Splash from './screens/Splash';
import Home from './screens/Home';
import MovieDetail from './screens/MovieDetail';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';

const Stack = createNativeStackNavigator();

const Index = () => {
  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (state.isConnected != true) {
        Alert.alert('Error', 'Unable to Connect to The Internet', [
          {text: 'OK'},
        ]);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
