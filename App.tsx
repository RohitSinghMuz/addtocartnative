import {View, Text} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Appnavigation from './app/component/navigation/Appnavigation';
const App = () => {
  return (
    <NavigationContainer>
      <Appnavigation />
    </NavigationContainer>
  );
};

export default App;
