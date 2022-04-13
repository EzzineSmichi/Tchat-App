import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet} from 'react-native';
import SInfo from 'react-native-sensitive-info';

interface Props {
  navigation: any;
}

const MainNavigator: React.FC<Props> = props => {
  const signOut = async () => {
    try {
      SInfo.deleteItem('token', {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      });
      props.navigation.push('Auth');
      //this.setState({user: null}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={signOut}
        labelStyle={{textAlign: 'center'}}
        activeTintColor="#fff"
        activeBackgroundColor="#7a42f4"
        inactiveBackgroundColor="#fff"
        style={{marginTop: 0.1}}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default MainNavigator;
