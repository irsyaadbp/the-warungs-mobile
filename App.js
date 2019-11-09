/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StatusBar} from 'react-native';

import MainNavigation from './src/Screens/MainNavigation';

import {mapping, light as lightTheme} from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from 'react-native-ui-kitten';

import AppRouter from './src/Routes/AppRouter';

import {Provider} from 'react-redux';
import store from './src/Redux/store';

export const theme = {
  ...lightTheme,

  'color-primary-100': '#D0F2FF', // <- new primary color
  'color-primary-200': '#A2E0FF',
  'color-primary-300': '#74CAFF',
  'color-primary-400': '#51B4FF',
  'color-primary-500': '#1890FF',
  'color-primary-600': '#116FDB',
  'color-primary-700': '#0C53B7',
  'color-primary-800': '#073A93',
  'color-primary-900': '#04297A',

  'text-basic-color': '$color-basic-800',
  'text-disabled-color': '$color-basic-600',
};

const App = () => (
  <Provider store={store}>
    <IconRegistry icons={EvaIconsPack} />
    <StatusBar backgroundColor="#F7F9FC" barStyle="dark-content" />
    <ApplicationProvider mapping={mapping} theme={theme}>
      <AppRouter />
    </ApplicationProvider>
  </Provider>
);

export default App;
