import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Text, Avatar, Layout, Button} from 'react-native-ui-kitten';
import AsyncStorage from '@react-native-community/async-storage';

import {useSelector} from 'react-redux';

const MoreScreen = props => {
  const {user} = useSelector(state => state.auth);
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure to logout?', [
      {text: 'Cancel', onPress: () => {}},
      {text: 'Yes', onPress: () => removeAsyncStorage()},
    ]);
  };

  const removeAsyncStorage = () => {
    AsyncStorage.removeItem('@user')
      .then(response => {
        Alert.alert('Success logout');
        props.navigation.navigate('Login');
      })
      .catch(err => Alert.alert('Logout Failed', 'Please try again later'));
  };
  return (
    <View style={{backgroundColor: '#f2f5f7', height: '100%', padding: 24}}>
      <StatusBar backgroundColor="#f2f5f7" barStyle="dark-content" />
      <View style={{marginVertical: 16, flexDirection: 'row'}}>
        <Avatar
          style={styles.item}
          size="giant"
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
          }}
        />
        <View
          style={{
            marginHorizontal: 24,
            // backgroundColor: 'red',
            paddingVertical: 24,
            justifyContent: 'space-evenly',
          }}>
          <Text category="h5">{user.username}</Text>
          <Text category="h6" appearance="hint">
            Admin
          </Text>
        </View>
      </View>
      <Layout
        style={{
          height: 200,
          borderRadius: 8,
          padding: 16,
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity>
          <Text
            style={{
              padding: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#f2f5f7',
            }}>
            Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              padding: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#f2f5f7',
            }}>
            Change Username
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              padding: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#f2f5f7',
            }}>
            Night Mode
          </Text>
        </TouchableOpacity>
      </Layout>
      <Button
        style={{marginTop: 24}}
        appearance="outline"
        status="danger"
        size="large"
        onPress={handleLogout}>
        LOGOUT
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    width: 100,
    height: 100,
  },
});

export default MoreScreen;
