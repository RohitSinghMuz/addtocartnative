import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../splash/Splash';
import Login from '../loginsingup/Login';
import Adminnavigation from './Adminnavigation';
import Usersnavigation from './Usersnavigation';

const Stack = createStackNavigator();

const Appnavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Adminnavigation"
        component={Adminnavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Usersnavigation"
        component={Usersnavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Appnavigation;
