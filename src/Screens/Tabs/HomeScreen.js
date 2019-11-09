import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from 'react-native';

import Greetings from '../../Components/Home/Greetings';
import Report from '../../Components/Home/Report';
import RecentOrder from '../../Components/Home/RecentOrder';

import {getRecentOrder} from '../../Redux/Actions/order';
import {useSelector, useDispatch} from 'react-redux';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const HomeScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    fetchDataOrder().then(() => setRefreshing(false));
  }, []);

  const fetchDataOrder = async (params = {perpage: 5}) => {
    await dispatch(getRecentOrder(user.token, params));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1890ff" barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#1890ff', '#1890ff']}
            tintColor="#1890ff"
          />
        }>
        {/* <Greetings /> */}
        <Report />
        <RecentOrder />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f5f7',
    height: '100%',
  },
});

export default HomeScreen;
