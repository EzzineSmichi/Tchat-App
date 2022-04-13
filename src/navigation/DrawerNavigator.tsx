import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import MainNavigator from './MainNavigator';

interface Props {}

const DrawerNavigator: React.FC<Props> = props => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#fff',
        activeBackgroundColor: '#7a42f4',
        inactiveBackgroundColor: '#fff',
        contentContainerStyle: {marginTop: 50},
        itemStyle: {marginTop: 0.1},
        labelStyle: {textAlign: 'center'},
        style: {backgroundColor: '#ccc'},
      }}
      drawerContent={props => <MainNavigator {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: '#7a42f4'},
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
