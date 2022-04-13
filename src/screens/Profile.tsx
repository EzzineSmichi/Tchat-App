import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {}

const Profile: React.FC<Props> = props => (
  <View style={styles.container}>
    <Text style={{fontSize: 30}}> Profile </Text>
  </View>
);

Profile.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default Profile;
