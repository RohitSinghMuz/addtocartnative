import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Loginuser from '../loginsingup/Loginuser';
import Userhome from '../user/Userhome';
import Cart from '../user/Cart';

const Stack = createStackNavigator();

const Usersnavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Loginuser">
      <Stack.Screen
        name="Loginuser"
        component={Loginuser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Userhome"
        component={Userhome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default Usersnavigation;
