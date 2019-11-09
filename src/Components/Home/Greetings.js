import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-ui-kitten';

const Greetings = () => {
  return (
    <View style={{marginTop: 32}}>
      <Text category="h5" appearance="hint">
        Hello,
      </Text>
      <Text category="h3">Samantha</Text>
    </View>
  );
};

export default Greetings;
