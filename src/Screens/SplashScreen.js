import React, {useEffect, useCallback} from 'react';
import {View, Image, StatusBar, StyleSheet} from 'react-native';
import {Text} from 'react-native-ui-kitten';

import {useDispatch} from 'react-redux';
import {getUser} from '../Redux/Actions/auth';
import AsyncStorage from '@react-native-community/async-storage';

const logo = require('../../assets/logo-white.png');

const Splashscreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      getUserDetailCallback();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [getUserDetailCallback]);

  const getUserDetail = () => {
    dispatch(getUser()).then(async response => {
      if (response.value !== null) {
        // AsyncStorage.removeItem('@user');
        props.navigation.navigate('Dashboard');
      } else {
        props.navigation.navigate('Login');
      }
    });
  };

  const getUserDetailCallback = useCallback(getUserDetail, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1890ff" barStyle="light-content" />
      <Image source={logo} style={{width: '100%'}} resizeMode="center" />
      <Text category="h5" style={styles.title}>
        The Warungs
      </Text>
      {/* <Text category="p1" style={styles.caption}>
        The Best Solution for Your Restaurant
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1890ff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'Merriweather-BlackItalic',
    // fontWeight: 'bold',
  },
  caption: {
    color: 'white',
    // fontFamily: 'Merriweather-Light',
    marginTop: 10,
    // fontWeight: 'bold',
  },
});

export default Splashscreen;
