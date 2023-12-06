import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Loginadmin from '../loginsingup/Loginadmin';
import Adminhome from '../Admin/Adminhome';

const Stack = createStackNavigator();

const Adminnavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Loginadmin">
      <Stack.Screen
        name="Loginadmin"
        component={Loginadmin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Adminhome"
        component={Adminhome}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Adminnavigation;
