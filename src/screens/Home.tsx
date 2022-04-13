import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {}

const Home: React.FC<Props> = props => (
  <View style={styles.container}>
    <Text style={{fontSize: 30}}> Home </Text>
  </View>
);

Home.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default Home;
