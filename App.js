import React, { Component } from 'react';
import { Button, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import BatchList from './BatchList';
import NewAudio from './NewAudio';
import Report from './Report';
import About from './About';
import styles from './Styles'

const Stack = createStackNavigator();


function TOP() {
  return (
    <View >

    </View>
  );
}


export default class App extends Component {
  createHomeStack = () =>
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "",
          headerTitle: props => <TOP {...props} />,
          headerStyle: { height: 0, backgroundColor: 'rgba(52, 52, 52, alpha)' },
          headerTintColor: "white",
          inactiveBackgroundColor: 'red',

        }}
      />
      <Stack.Screen
        name="NewAudio"
        component={NewAudio}
        options={{
          title: "Upload new voice",
          headerStyle: { backgroundColor: '#f57b1d', },
          headerTintColor: "white"
        }}
      />

      <Stack.Screen
        name="BatchList"
        component={BatchList}
        options={{
          title: "BatchList",
          headerStyle: { height: 40, backgroundColor: 'rgba(37, 211, 102,1)' },
          headerTintColor: "white"
        }}
      />

      <Stack.Screen
        name="Report"
        component={Report}
        options={{
          title: "Report",
          headerStyle: { height: 40, backgroundColor: '#642594' },
          headerTintColor: "white"
        }}
      />
      
      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: "About",
          headerStyle: { height: 40, backgroundColor: '#212121' },
          headerTintColor: "white"
        }}
      />

    </Stack.Navigator>


  render() {
    return (
      <NavigationContainer>
        {this.createHomeStack()}
      </NavigationContainer>
    );
  }

}



