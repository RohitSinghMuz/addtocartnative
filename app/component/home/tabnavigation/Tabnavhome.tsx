import * as React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../Home';
import Category from '../Category';
import Checkout from '../Checkout';
import Homedrawer from '../Homedrawer';
const Tab = createBottomTabNavigator();

const Tabnavhome: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = 'default-icon';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Category') {
            iconName = focused ? 'pie-chart' : 'pie-chart-outline';
          } else if (route.name === 'Checkout') {
            iconName = focused ? 'copy' : 'copy-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={Homedrawer}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Checkout"
        component={Checkout}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default Tabnavhome;
