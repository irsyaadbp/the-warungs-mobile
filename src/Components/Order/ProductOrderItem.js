import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text} from 'react-native-ui-kitten';

const ProductOrderItem = props => {
  return (
    <TouchableOpacity style={styles.productItem} onPress={props.onPress}>
      <View
        style={[
          styles.productContent,
          props.item.isSelected ? styles.productContentSelected : '',
        ]}>
        <Image source={{uri: props.item.image}} style={styles.productImg} />
        <Text
          category="p2"
          style={[
            styles.price,
            props.item.isSelected
              ? styles.priceSelected
              : styles.priceNotSelected,
          ]}>
          {props.item.price}
        </Text>
        <View style={styles.productDetail}>
          <Text category="s1" style={styles.fontFamily}>
            {props.item.product_name}
          </Text>
          <Text
            category="c1"
            appearance="hint"
            style={[{marginTop: 8}, styles.fontFamily]}>
            {props.item.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productItem: {
    height: 300,
    padding: 8,
    width: '50%',
  },
  productContent: {
    backgroundColor: 'white',
    height: '100%',
    borderRadius: 12,
  },
  productContentSelected: {
    borderWidth: 4,
    borderColor: '#1890ff',
  },
  productImg: {
    height: '65%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  price: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    padding: 8,
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 8,
  },
  priceSelected: {
    backgroundColor: '#1890ff',
    color: 'white',
  },
  priceNotSelected: {
    backgroundColor: 'white',
    color: 'black',
  },
  productDetail: {
    marginHorizontal: 16,
    marginVertical: 8,
    flex: 1,
  },
  fontFamily: {
    fontFamily: 'Merriweather-Regular',
  },
});

export default ProductOrderItem;
