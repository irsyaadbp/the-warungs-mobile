import React, {useState, useEffect, useCallback} from 'react';
import {
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Icon, Button, Input, Spinner, Text} from 'react-native-ui-kitten';

import {useSelector, useDispatch} from 'react-redux';
import {login, getUser} from '../../Redux/Actions/auth';

const LoginIllustration = require('../../../assets/login-resize.png');

const {height, width} = Dimensions.get('window');

const LoginScreen = props => {
  const [input, setInput] = useState({
    username: '',
    password: '',
    secureTextEntry: true,
  });

  const [error, setError] = useState({
    status: false,
    username: '',
    password: '',
  });

  const {isLoading} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onChangeText = name => value => {
    setInput({...input, [name]: value});
  };

  const renderIcon = style => {
    const iconName = input.secureTextEntry ? 'eye-off' : 'eye';
    return <Icon {...style} name={iconName} />;
  };

  const onIconPress = () => {
    setInput({...input, secureTextEntry: !input.secureTextEntry});
  };

  const handleSubmit = async () => {
    const submit = await dispatch(login(input));
    if (submit.value.data.status === 200) {
      try {
        await AsyncStorage.setItem(
          '@user',
          JSON.stringify(submit.value.data.result),
        );
        props.navigation.navigate('Dashboard');
      } catch (e) {
        // saving error
        console.log(e);
      }
    } else {
      const msg = submit.value.data.message;
      if (msg.search('name') >= 0 || msg.search('User') >= 0) {
        setError({username: msg, status: true, password: ''});
      } else if (msg.search('Password') >= 0) {
        setError({username: '', status: true, password: msg});
      }
    }
  };

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#F7F9FC" barStyle="dark-content" />
      <ImageBackground source={LoginIllustration} style={styles.illustration} />
      <Text category="h5" style={[styles.loginTitle, styles.fontFamily]}>
        Login First
      </Text>
      <Input
        style={[styles.input, styles.fontFamily]}
        value={input.username}
        onChangeText={onChangeText('username')}
        placeholder="Username"
        size="small"
        status={
          error.status &&
          (error.username.search('name') >= 0 ||
            error.username.search('User') >= 0)
            ? 'danger'
            : ''
        }
        caption={error.username}
      />
      <Input
        value={input.password}
        placeholder="Password"
        icon={renderIcon}
        secureTextEntry={input.secureTextEntry}
        onIconPress={onIconPress}
        onChangeText={onChangeText('password')}
        style={[styles.input, styles.fontFamily]}
        size="small"
        status={
          error.status && error.password.search('Password') >= 0 ? 'danger' : ''
        }
        caption={error.password}
      />
      <Button
        textStyle={{fontFamily: 'Merriweather-Regular'}}
        onPress={() => handleSubmit()}
        style={styles.button}
        size="large">
        Login
      </Button>
      <View style={styles.registerText}>
        <Text category="p1" style={styles.fontFamily}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
          <Text style={[{color: '#1890ff'}, styles.fontFamily]}>
            {' '}
            Register here
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={styles.loading}>
          <Spinner size="medium" />
          <Text style={[styles.fontFamily, styles.textLoading]}>
            loading...
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: '#F7F9FC', flex: 1, justifyContent: 'center'},
  form: {
    flexDirection: 'column',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  input: {
    // flex: 3,
    marginHorizontal: 24,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  button: {
    // flex: 3,
    marginHorizontal: 24,
    marginVertical: 8,
  },
  registerText: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginVertical: 16,
  },
  loginTitle: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 8,
  },
  fontFamily: {
    fontFamily: 'Merriweather-Regular',
  },
  loading: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLoading: {color: 'rgba(52, 52, 52, 0.4)', marginTop: 12},
  illustration: {height: height / 3},
});

export default LoginScreen;
