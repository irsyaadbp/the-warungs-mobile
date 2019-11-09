import React from 'react';
import {Text, Button} from 'react-native-ui-kitten';
import {View, ScrollView, Alert} from 'react-native';
import TopNavigation from '../../Components/TopNavigation';
import NumberFormat from 'react-number-format';

import {useSelector, useDispatch} from 'react-redux';

import ShoppingCartItem from '../../Components/ShoppingCartItem';
import {checkoutOrder} from '../../Redux/Actions/order';

const ShoppingCartScreen = props => {
  const {user, detailOrder, totalPrice} = useSelector(state => ({
    user: state.auth.user,
    detailOrder: state.order.detailOrder,
    totalPrice: state.order.total_price,
  }));

  const dispatch = useDispatch();

  const submitCheckoutOrder = async () => {
    const submitCheckout = await dispatch(
      checkoutOrder(user.token, {
        admin_id: user.user_id,
        total_price: totalPrice,
        detail_order: detailOrder,
      }),
    );

    console.log(submitCheckout.value.data, 'submit value');

    if (submitCheckout.value.data.status === 200) {
      Alert.alert('Success');
    } else {
      Alert.alert('Failed');
    }
  };

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#f2f5f7',
      }}>
      <TopNavigation
        navigation={props.navigation}
        title="Shopping Cart"
        theme="light"
        showBack={true}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 16}}>
        {detailOrder.length === 0 ? (
          <Text>Empty</Text>
        ) : (
          detailOrder.map((item, index) => (
            <ShoppingCartItem product={item} key={index} />
          ))
        )}
      </ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          height: 80,
          flexDirection: 'row',
          padding: 16,
        }}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text category="p1" appearance="hint">
            Total
          </Text>
          <NumberFormat
            value={totalPrice}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp '}
            renderText={value => (
              <Text category="h6" style={{fontFamily: 'Merriweather-Bold'}}>
                {value}
              </Text>
            )}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Button onPress={submitCheckoutOrder}>Checkout</Button>
        </View>
      </View>
    </View>
  );
};

export default ShoppingCartScreen;
