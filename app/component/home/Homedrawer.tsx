import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Home';
import Profile from './Profile';
import DrawerContent from './DrawerContent';
const Drawer = createDrawerNavigator();

const Homedrawer = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default Homedrawer;
