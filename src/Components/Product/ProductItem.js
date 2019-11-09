import React from 'react';
import {View, TouchableOpacity, ScrollView, Image, Alert} from 'react-native';
import {Text, Icon} from 'react-native-ui-kitten';
import NumberFormat from 'react-number-format';
import {useSelector, useDispatch} from 'react-redux';
import {deleteProduct} from '../../Redux/Actions/product';

const img =
  'https://www.pegipegi.com/travel/wp-content/uploads/2019/08/shutterstock_1134726989.jpg';

const ProductItem = props => {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const deleteProductId = product => {
    console.log(product, 'alert');
    Alert.alert('Delete', `Are you sure to delete ${product.product_name} ?`, [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          //   console.log(auth);
          dispatch(deleteProduct(user.token, product.id))
            .then(response => {
              if (response.value.data.status === 200) {
                Alert.alert(
                  'Success',
                  `Product ${product.product_name} successfully deleted`,
                );
              } else {
                Alert.alert(
                  'Failed',
                  `Deleted failed product ${product.product_name}`,
                );
              }
              //   if(resonse.value)
            })
            .catch(err =>
              Alert.alert(
                'Failed',
                `Deleted failed product ${product.product_name}`,
              ),
            );
        },
      },
    ]);
  };
  return (
    <View
      style={{
        height: 150,
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        marginBottom: 8,
      }}>
      <Image
        source={{uri: props.item.image}}
        style={{height: '100%', width: 120, borderRadius: 8, flex: 1}}
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
            {props.item.product_name}
          </Text>
          <Text
            category="p2"
            // appearance="hint"
            style={{fontFamily: 'Merriweather-Regular', marginTop: 12}}>
            {props.item.description}
          </Text>
          <Text
            category="p2"
            appearance="hint"
            style={{fontFamily: 'Merriweather-Regular', marginTop: 12}}>
            {props.item.category}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <NumberFormat
            value={props.item.price}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp '}
            renderText={value => (
              <Text
                category="p1"
                style={{fontFamily: 'Merriweather-Bold', marginTop: 8}}>
                {value}
              </Text>
            )}
          />
          <View style={{alignSelf: 'flex-end'}}>
            <View style={{alignSelf: 'center', flexDirection: 'row'}}>
              <TouchableOpacity
              // onPress={() =>
              //   props.navigation.navigate('EditCategory', {
              //     item: props.item,
              //   })
              // }
              >
                <Icon
                  name="edit"
                  width={24}
                  height={24}
                  fill="#00B383"
                  style={{marginRight: 16}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteProductId(props.item)}>
                <Icon name="trash-2" width={24} height={24} fill="#FF3D71" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;
