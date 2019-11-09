import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Icon, Spinner} from 'react-native-ui-kitten';
import OrderHistoryItem from './OrderHistoryItem';

import {getRecentOrder} from '../../Redux/Actions/order';
import {useSelector, useDispatch} from 'react-redux';

const RecentOrder = () => {
  const {order, auth} = useSelector(state => ({
    order: state.order,
    auth: state.auth,
  }));
  const dispatch = useDispatch();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      fetchDataOrderCallback();
    }, 0);
    return () => clearTimeout(timeout);
  }, [fetchDataOrderCallback]);

  const fetchDataOrder = async (params = {perpage: 5}) => {
    await dispatch(getRecentOrder(auth.user.token, params));
  };
  const fetchDataOrderCallback = React.useCallback(fetchDataOrder, []);

  return (
    <View style={styles.recentContainer}>
      <View style={styles.titleContainer}>
        <Text category="h6" style={styles.titleRecent}>
          Recent Order
        </Text>
        <TouchableOpacity>
          <View style={styles.viewMoreContainer}>
            <Text category="p2" style={styles.textViewMore} status="primary">
              View More
            </Text>
            <Icon name="arrow-forward" width={16} height={16} fill="#1890ff" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {order.isLoading ? (
          <Spinner />
        ) : order.recentOrderList.status === 200 ? (
          order.recentOrderList.result.data.map((item, index) => (
            <OrderHistoryItem item={item} key={index} />
          ))
        ) : (
          <Text>Empty</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  card: {
    borderRadius: 8,
    padding: 24,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    flex: 2,
  },
  squareLeft: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'space-between',
  },
  squareRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  badgeSuccess: {
    fontFamily: 'Merriweather-Regular',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderColor: '#00E096',
    color: '#00E096',
    marginBottom: 10,
  },
  badgeCancel: {
    fontFamily: 'Merriweather-Regular',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderColor: '#FF3D71',
    color: '#FF3D71',
    marginBottom: 10,
  },
  textViewMore: {fontFamily: 'Merriweather-Regular', marginRight: 4},
  viewMoreContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // backgroundColor: 'red',
  },
  titleRecent: {color: '#969696', fontFamily: 'Merriweather-Regular'},
  titleContainer: {justifyContent: 'space-between', flexDirection: 'row'},
  recentContainer: {marginTop: 48, paddingHorizontal: 24},
});

export default RecentOrder;
