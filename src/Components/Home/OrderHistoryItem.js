import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Layout} from 'react-native-ui-kitten';
import moment from 'moment';
import NumberFormat from 'react-number-format';

const OrderHistoryItem = props => {
  return (
    <Layout style={styles.card}>
      <View style={styles.squareLeft}>
        <Text
          category="p2"
          appearance="hint"
          style={{fontFamily: 'Merriweather-Regular'}}>
          {moment(props.item.created_at)
            .utc()
            .format('D MMMM YYYY')}
        </Text>
        <Text category="h6" style={{fontFamily: 'Merriweather-Regular'}}>
          {'#' + props.item.order_id}
        </Text>
      </View>
      <View style={styles.squareRight}>
        <Text
          category="p2"
          style={
            props.item.status === 'success'
              ? styles.badgeSuccess
              : styles.badgeCancel
          }>
          {props.item.status}
        </Text>

        <NumberFormat
          value={props.item.total_price}
          displayType={'text'}
          thousandSeparator={'.'}
          decimalSeparator={','}
          prefix={'Rp '}
          renderText={value => (
            <Text category="h6" style={{fontFamily: 'Merriweather-Regular'}}>
              {value}
            </Text>
          )}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 24,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
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
});

export default OrderHistoryItem;
