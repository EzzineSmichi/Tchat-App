import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

interface Props {
  submitData: () => void;
  loading: boolean;
}

const ButtonSubmit: React.FC<Props> = ({submitData, loading}) => (
  <TouchableOpacity style={styles.submitButton} onPress={submitData}>
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
);

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 15,
    margin: 15,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
  },
});

export default ButtonSubmit;
