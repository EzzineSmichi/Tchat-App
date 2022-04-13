import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import {API_URl} from '../constants';
import ButtonSubmit from '../components/ButtonSubmit';
import InputWithIcon from '../components/InputWithIcon';
import {useIsFocused} from '@react-navigation/native';

interface Props {
  navigation: any;
}

const Login: React.FC<Props> = ({navigation}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>();
  const [isValidPasswordLength, setIsValidPasswordLength] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();

  // const dispatch = useDispatch();
  // const auth = useSelector(state => state.authentication);

  const handleValidEmail = (val: string) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (val.match(mailformat)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const handleValidPasswordLength = (val: string | any[]) => {
    if (val.length >= 6) {
      setIsValidPasswordLength(true);
    } else {
      setIsValidPasswordLength(false);
    }
  };

  const onSubmit = async (data: {email: string; password: string}) => {
    setError('');
    const {email, password} = data;
    if (!email || !password) {
      handleValidEmail(email);
      handleValidPasswordLength(password);
    }

    if (isValidEmail && isValidPasswordLength) {
      setLoading(true);
      try {
        console.log({data});
        const res = await axios({
          url: `${API_URl}/auth/login`,
          method: 'post',
          data,
        });

        if (res) {
          await SInfo.setItem('token', JSON.stringify(res.data.token), {
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain',
          });
          console.log({navigation});
          navigation.push('Main');
        }
      } catch (error) {
        console.log('error', error.response.data.message);
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={{color: 'red'}}>{error}</Text>
      ) : (
        <View style={{marginTop: 25}} />
      )}

      <View style={styles.containerForm}>
        <InputWithIcon
          underlineColorAndroid="transparent"
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={val => setFormData({...formData, email: val.trim()})}
          onEndEditing={e => handleValidEmail(e.nativeEvent.text)}
          iconName="mail-bulk"
          keyboardType="email-address"
        />
        {isValidEmail === false ? (
          <Text style={styles.validation}>
            Please enter a valid email address
          </Text>
        ) : (
          <View style={{marginTop: 25}} />
        )}
        <InputWithIcon
          underlineColorAndroid="transparent"
          placeholder="Password"
          autoCapitalize="none"
          isPassword={true}
          onChangeText={val => setFormData({...formData, password: val})}
          onEndEditing={e => handleValidPasswordLength(e.nativeEvent.text)}
          iconName="eye"
        />
        {isValidPasswordLength === false ? (
          <Text style={styles.validation}>Please enter a valid password </Text>
        ) : (
          <View style={{marginTop: 25}} />
        )}
        <TouchableOpacity
          style={{marginVertical: 10}}
          onPress={() => {
            navigation.push('ResetPassword');
          }}>
          <Text
            style={{
              color: '#7a42f4',
              fontWeight: '700',
              textAlign: 'left',
            }}>
            Forget Password ?
          </Text>
        </TouchableOpacity>
        <ButtonSubmit submitData={() => onSubmit(formData)} loading={loading} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>You don't have account, let's </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text
            style={{
              color: '#7a42f4',
              fontWeight: '700',
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

Login.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: 'rgba(0,0,0,.1)',
  },
  containerForm: {
    width: '80%',
    alignItems: 'center',
  },
  validation: {
    color: 'red',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Login;
