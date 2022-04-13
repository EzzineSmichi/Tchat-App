import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import {API_URl} from '../constants';
import ButtonSubmit from '../components/ButtonSubmit';
import InputWithIcon from '../components/InputWithIcon';
import {useIsFocused} from '@react-navigation/native';

interface Props {
  navigation: any;
}

const Register: React.FC<Props> = ({navigation}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>();
  const [isValidName, setIsValidName] = useState<boolean>();
  const [isValidPasswordLength, setIsValidPasswordLength] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const handleValidName = (val: string | any[]) => {
    if (val.length >= 6) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }
  };

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

  const submitData = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setError('');
    const {name, email, password} = data;
    if (!name || !email || !password) {
      handleValidName(name);
      handleValidEmail(email);
      handleValidPasswordLength(password);
    }
    if (isValidName && isValidEmail && isValidPasswordLength) {
      setLoading(true);
      try {
        console.log('data', data);
        const res = await axios({
          url: `${API_URl}/auth/register`,
          method: 'post',
          data,
        });
        console.log('res');
        if (res) {
          await SInfo.setItem('token', JSON.stringify(res.data.token), {
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain',
          });
          navigation.push('Main');
          console.log(res);
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
          placeholder="Name"
          autoCapitalize="none"
          onChangeText={val => setFormData({...formData, name: val})}
          onEndEditing={e => handleValidName(e.nativeEvent.text)}
          iconName="user"
        />
        {isValidName === false ? (
          <Text style={styles.validation}>Please enter a valid Name</Text>
        ) : (
          <View style={{marginTop: 25}} />
        )}

        <InputWithIcon
          underlineColorAndroid="transparent"
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={val => setFormData({...formData, email: val.trim()})}
          onEndEditing={e => handleValidEmail(e.nativeEvent.text)}
          iconName="mail-bulk"
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

        <ButtonSubmit
          submitData={() => submitData(formData)}
          loading={loading}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>You have account, let's </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}>
          <Text
            style={{
              color: '#7a42f4',
              fontWeight: '700',
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

Register.defaultProps = {};

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
  input: {
    width: '100%',
    margin: 15,
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderColor: '#7a42f4',
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
  },
  validation: {
    color: 'red',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Register;
