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
