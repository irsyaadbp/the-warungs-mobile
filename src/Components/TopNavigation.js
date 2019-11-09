import React from 'react';
import {Text, Icon} from 'react-native-ui-kitten';
import {View, BackHandler, Alert, StatusBar} from 'react-native';

const TopNavigation = props => {
  const onBackPress = () => {
    props.navigation.goBack(null);
  };

  return (
    <View
      style={{
        height: 60,
        backgroundColor: props.theme === 'light' ? 'white' : '#1890ff',
        padding: 16,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <StatusBar
        backgroundColor="#fff"
        barStyle={props.theme === 'light' ? 'dark-content' : 'light-content'}
      />
      {props.showBack ? (
        <Icon
          name="arrow-back"
          width={24}
          height={24}
          style={{
            marginRight: 16,
            color: props.theme === 'light' ? 'black' : 'white',
          }}
          onPress={() => props.navigation.goBack()}
        />
      ) : null}

      <Text category="h6" style={{fontFamily: 'Merriweather-Bold'}}>
        {props.title}
      </Text>
    </View>
  );
};

export default TopNavigation;
