import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Text,
} from 'react-native-ui-kitten';

import {createAppContainer, View} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeScreen from './Tabs/HomeScreen';
import OrderScreen from './Tabs/OrderScreen';
import ProductScreen from './Tabs/ProductScreen';
import CategoryScreen from './Tabs/CategoryScreen';
import MoreScreen from './Tabs/MoreScreen';

export const BottomNavigationShowcase = props => {
  const HomeIcon = style => <Icon {...style} name="home" />;
  const OrderIcon = style => <Icon {...style} name="shopping-bag" />;
  const ProductIcon = style => <Icon {...style} name="cube" />;
  const CategoryIcon = style => <Icon {...style} name="inbox" />;

  const SettingsIcon = style => <Icon {...style} name="more-horizontal" />;

  const onTabSelect = selectedIndex => {
    const routes = props.navigation.state.routes;
    const selectedRoute = routes[selectedIndex];
    props.navigation.navigate(selectedRoute.routeName);
  };

  return (
    <BottomNavigation
      selectedIndex={props.navigation.state.index}
      onSelect={onTabSelect}
      appearance="noIndicator">
      <BottomNavigationTab title="Home" icon={HomeIcon} />
      <BottomNavigationTab title="Order" icon={OrderIcon} />
      <BottomNavigationTab title="Product" icon={ProductIcon} />
      <BottomNavigationTab title="Category" icon={CategoryIcon} />
      <BottomNavigationTab title="More" icon={SettingsIcon} />
    </BottomNavigation>
  );
};

export const MainNavigation = createBottomTabNavigator(
  {
    HomeScreen: HomeScreen,
    OrderScreen: OrderScreen,
    ProductScreen: ProductScreen,
    CategoryScreen: CategoryScreen,
    MoreScreen: MoreScreen,
  },
  {
    initialRouteName: 'HomeScreen',
    tabBarComponent: BottomNavigationShowcase,
  },
);

export default createAppContainer(MainNavigation);
