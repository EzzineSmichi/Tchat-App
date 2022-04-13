import React, {useEffect} from 'react';
import SInfo from 'react-native-sensitive-info';
import LottieView from 'lottie-react-native';

interface Props {
  navigation: any;
}

const SplachScreen: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    // Check if token is set or not
    // If not then send for Authentication
    // else send to Home Screen

    setTimeout(() => {
      SInfo.getItem('token', {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      }).then(value => {
        navigation.replace(value === null ? 'Auth' : 'Main');
      });
    }, 0);
  }, []);

  return (
    <LottieView
      source={require('../../assets/splash.json')}
      autoPlay
      loop
      cacheStrategy="strong"
    />
  );
};

export default SplachScreen;
