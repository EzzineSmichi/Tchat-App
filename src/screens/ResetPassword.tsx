import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {API_URl} from '../constants';

interface Props {
  navigation: any;
}

const ResetPassword: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const handleValidEmail = (val: string) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (val.match(mailformat)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const onSubmit = async (email: string) => {
    console.log('data=====>', email);
    const data = {email};
    setLoading(true);
    try {
      const res = await axios({
        method: 'post',
        url: `${API_URl}/auth/forgetPassword`,
        data,
      });

      if (res) {
        console.log('res for reset pass', res);

        if (res.data.success) {
          console.log('enter');
          navigation.push('Auth');
        } else {
          setError(res.data.message);
        }
      }
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
      <Text>Enter your email</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Email"
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
        onChangeText={val => setEmail(val.trim())}
        onEndEditing={e => handleValidEmail(e.nativeEvent.text)}
      />
      {isValidEmail === false && (
        <Text style={styles.validation}>
          Please enter a valid email address
        </Text>
      )}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => onSubmit(email)}>
        {loading ? (
          <ActivityIndicator
            animating={loading}
            color="#fff"
            size="small"
            style={styles.activityIndicator}
          />
        ) : (
          <Text style={styles.submitButtonText}> Submit </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

ResetPassword.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginVertical: 50,
    //justifyContent: 'center',
  },
  input: {
    width: '80%',
    margin: 15,
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderColor: '#7a42f4',
  },
  validation: {
    color: 'red',
    fontSize: 12,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 15,
    margin: 15,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    //fontWeight: '700',
    alignItems: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
    //height: 20,
  },
});

export default ResetPassword;
