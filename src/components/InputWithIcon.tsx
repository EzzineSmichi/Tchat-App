import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  placeholder: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  onChangeText: (val: string) => void;
  onEndEditing: (e: any) => void;
  isPassword?: boolean;
  underlineColorAndroid: string;
  iconName: string;
  keyboardType?: string;
}

const InputWithIcon: React.FC<Props> = ({
  placeholder,
  autoCapitalize,
  onChangeText,
  onEndEditing,
  isPassword,
  underlineColorAndroid,
  iconName,
  keyboardType,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.container}>
      {isPassword == undefined ? (
        <Icon name={iconName} size={20} color="#7a42f4" />
      ) : showPassword ? (
        <Icon
          name={iconName}
          size={20}
          color="#7a42f4"
          //backgroundColor="rgba(0,0,0,.1)"
          onPress={() => setShowPassword(prev => !prev)}
        />
      ) : (
        <Icon
          name="eye-slash"
          size={20}
          color="#7a42f4"
          // backgroundColor="rgba(0,0,0,.1)"
          onPress={() => setShowPassword(prev => !prev)}
        />
      )}

      <TextInput
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        underlineColorAndroid={underlineColorAndroid}
        secureTextEntry={isPassword && !showPassword}
        keyboardType={keyboardType}
        style={{
          position: 'absolute',
          left: 50,
          height: '100%',
          width: '100%',
          borderLeftColor: '#7a42f4',
          borderLeftWidth: 2,
          paddingStart: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    margin: 15,
    height: 60,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 15,
    //backgroundColor: '#fff',
    borderColor: '#7a42f4',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default InputWithIcon;
