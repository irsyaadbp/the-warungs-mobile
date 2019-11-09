import React from 'react';
import {Text, Icon} from 'react-native-ui-kitten';
import {View, Image, TouchableOpacity} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import NumberFormat from 'react-number-format';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {quantityChange, removeItemInOrder} from '../Redux/Actions/order';
const ShoppingCartItem = props => {
  const dispatch = useDispatch();

  const handleQuantityChange = id => async value => {
    await dispatch(quantityChange({id, quantity: value}));
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: 120,
        borderRadius: 8,
        padding: 12,
        flexDirection: 'row',
        marginBottom: 8,
      }}>
      {console.log(props.product, 'hasdjaksd')}
      <Image
        source={{uri: props.product.image}}
        style={{height: '100%', width: 100, borderRadius: 8, flex: 1}}
      />
      <View
        style={{
          flex: 2,
          marginLeft: 16,
          marginRight: 8,
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text category="p1" style={{fontFamily: 'Merriweather-Bold'}}>
            {props.product.product_name}
          </Text>
          <NumberFormat
            value={props.product.sub_total}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp '}
            renderText={value => (
              <Text
                category="p1"
                style={{fontFamily: 'Merriweather-Regular', marginTop: 8}}>
                {value}
              </Text>
            )}
          />
        </View>
        <View>
          {/* <Input/> */}
          <NumericInput
            onChange={handleQuantityChange(props.product.prod_id)}
            minValue={1}
            maxValue={props.product.oldQuantity}
            value={props.product.quantity}
            rounded
            totalHeight={35}
            iconStyle={{color: 'white'}}
            rightButtonBackgroundColor="#1890ff"
            leftButtonBackgroundColor="#1890ff"
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={async () => await dispatch(removeItemInOrder(props.product))}>
        <Icon name="close" width={24} height={24} style={{flex: 1}} />
      </TouchableOpacity>
    </View>
  );
};

export default ShoppingCartItem;
