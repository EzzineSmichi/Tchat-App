import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackground} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ResetPassword from '../screens/ResetPassword';
import SplachScreen from '../screens/SplachScreen';
import DrawerNavigator from './DrawerNavigator';

interface Props {}

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerStyle: {backgroundColor: '#7a42f4'},
      animationEnabled: false,
    }}>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{headerLeft: () => null}}
    />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="ResetPassword" component={ResetPassword} />
  </Stack.Navigator>
);

const Navigation: React.FC<Props> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        animationEnabled: false,
      }}>
      <Stack.Screen name="SplachScreen" component={SplachScreen} />
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Main" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default Navigation;
