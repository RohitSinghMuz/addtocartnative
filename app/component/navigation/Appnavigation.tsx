import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../splash/Splash';
import Home from '../home/Homedrawer';
import Login from '../loginsingup/Login';
import Otp from '../home/Otp';
import Homedrawer from '../home/Homedrawer';
import Tabnavhome from '../home/tabnavigation/Tabnavhome';
import Loginadmin from '../loginsingup/Loginadmin';
import Loginuser from '../loginsingup/Loginuser';
import Adminhome from '../Admin/Adminhome';
import Userhome from '../user/Userhome';
import Cart from '../user/Cart';

const Stack = createStackNavigator();

const Appnavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Userhome">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        //options={{headerShown: false}}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Loginadmin"
        component={Loginadmin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Loginuser"
        component={Loginuser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Adminhome"
        component={Adminhome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Userhome"
        component={Userhome}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Appnavigation;