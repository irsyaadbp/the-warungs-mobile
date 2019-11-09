import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MainNavigation from '../Screens/MainNavigation';
import LoginScreen from '../Screens/Auth/LoginScreen';
import RegisterScreen from '../Screens/Auth/RegisterScreen';
import Splashscreen from '../Screens/SplashScreen';

import ShoppingCartScreen from '../Screens/Cart/ShoppingCartScreen';

import AddModalCategory from '../Screens/Category/AddModalCategory';
import EditModalCategory from '../Screens/Category/EditModalCategory';

import AddModalProduct from '../Screens/Product/AddModalProduct';

const AuthRouter = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    Register: {screen: RegisterScreen},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
  },
);

const HomeRouter = createStackNavigator(
  {
    Dashboard: {screen: MainNavigation},
    ShoppingCart: {screen: ShoppingCartScreen},
    AddCategory: {screen: AddModalCategory},
    EditCategory: {screen: EditModalCategory},
    AddProduct: {screen: AddModalProduct},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Dashboard',
  },
);

const SplashRouter = createStackNavigator(
  {
    Splashscreen: {screen: Splashscreen},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Splashscreen',
  },
);

const AppRouter = createSwitchNavigator(
  {
    AuthRouter,
    HomeRouter,
    SplashRouter,
  },
  {
    headerMode: 'none',
    initialRouteName: 'SplashRouter',
  },
);

export default createAppContainer(AppRouter);
