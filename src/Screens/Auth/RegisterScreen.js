import React, {useState} from 'react';
import {
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import {Icon, Button, Input, Spinner, Text} from 'react-native-ui-kitten';
import Snackbar from 'react-native-snackbar';

import {useSelector, useDispatch} from 'react-redux';
import {register} from '../../Redux/Actions/auth';

const registerIllustration = require('../../../assets/register.png');

const {height, width} = Dimensions.get('window');

const RegisterScreen = props => {
  const [input, setInput] = useState({
    username: '',
    password: '',
    user_role: '',
    secureTextEntry: true,
  });

  const [error, setError] = useState({
    status: false,
    username: '',
    password: '',
    user_role: '',
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
    const submit = await dispatch(register(input));

    if (submit.value.data.status === 200) {
      clearForm();
      setError({status: false, username: '', password: '', user_role: ''});
      Alert.alert('Success', 'Register successfully, please login', [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Login',
          onPress: () => props.navigation.navigate('Login'),
        },
      ]);
    } else {
      const msg = submit.value.data.message;
      if (msg.search('name') >= 0) {
        setError({username: msg, status: true, password: '', user_role: ''});
      } else if (msg.search('Password') >= 0) {
        setError({username: '', status: true, password: msg, user_role: ''});
      } else if (msg.search('role') >= 0) {
        setError({username: '', status: true, password: '', user_role: msg});
      }
    }
  };

  const clearForm = () => {
    setInput({...input, username: '', password: '', user_role: ''});
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F7F9FC" barStyle="dark-content" />
      <ImageBackground
        source={registerIllustration}
        style={styles.illustration}
        resizeMode="center"
      />
      <Text
        category="h5"
        style={[
          {marginHorizontal: 24, marginTop: 24, marginBottom: 8},
          styles.fontFamily,
        ]}>
        Register Here
      </Text>

      <Input
        style={[styles.input, , styles.fontFamily]}
        value={input.username}
        status={
          error.status && error.username.search('name') >= 0 ? 'danger' : ''
        }
        caption={error.username}
        onChangeText={onChangeText('username')}
        placeholder="Username"
        size="small"
      />
      <Input
        value={input.password}
        placeholder="Place your Text"
        icon={renderIcon}
        secureTextEntry={input.secureTextEntry}
        status={
          error.status && error.password.search('Password') >= 0 ? 'danger' : ''
        }
        caption={error.password}
        onIconPress={onIconPress}
        onChangeText={onChangeText('password')}
        style={[styles.input, , styles.fontFamily]}
        size="small"
      />
      <Input
        style={[styles.input, styles.fontFamily]}
        value={input.user_role}
        status={
          error.status && error.user_role.search('role') >= 0 ? 'danger' : ''
        }
        caption={error.user_role}
        onChangeText={onChangeText('user_role')}
        placeholder="User Role"
        size="small"
      />
      <Button
        textStyle={{fontFamily: 'Merriweather-Regular'}}
        onPress={() => handleSubmit()}
        style={styles.button}
        size="large">
        Register
      </Button>
      <View style={styles.registerText}>
        <Text category="p1" style={styles.fontFamily}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text style={[{color: '#1890ff'}, styles.fontFamily]}>
            {' '}
            Login here
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

export default RegisterScreen;
