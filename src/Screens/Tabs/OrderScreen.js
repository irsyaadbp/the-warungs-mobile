import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Input, Icon, Select, Spinner, Text} from 'react-native-ui-kitten';
import ProductOrderItem from '../../Components/Order/ProductOrderItem';

import {useSelector, useDispatch} from 'react-redux';
import {
  getProductInOrder,
  addItemInOrder,
  removeItemInOrder,
} from '../../Redux/Actions/order';

const OrderScreen = props => {
  const [dataParams, setDataParams] = React.useState({
    search: '',
    sortby: '',
    orderby: '',
    page: '',
  });

  const [selectedItem, setSelectedItem] = React.useState({
    sortby: '',
    orderby: '',
  });

  const {order, auth} = useSelector(state => ({
    order: state.order,
    auth: state.auth,
  }));

  const {isLoading, productList, totalCart} = order;

  const dispatch = useDispatch();

  React.useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchData(dataParams);
      // fetchDataCallback(dataParams);
    }, 0);

    return () => clearTimeout(timeOut);
  }, [dataParams]);

  const fetchData = async (params = {}) => {
    await dispatch(getProductInOrder(auth.user.token, params));
  };

  const handleChange = value => {
    setDataParams({...dataParams, search: value});
  };

  const onSelect = name => selectedOption => {
    setSelectedItem({...selectedItem, [name]: selectedOption});
    setDataParams({...dataParams, [name]: selectedOption.value});
  };

  const renderIcon = style => {
    return <Icon {...style} name="search" />;
  };

  const handleSelectedProduct = async product => {
    if (!product.isSelected) await dispatch(addItemInOrder(product));
    else await dispatch(removeItemInOrder(product));
  };

  return (
    <View style={{backgroundColor: '#f2f5f7', height: '100%'}}>
      <View style={{backgroundColor: '#1890ff', paddingVertical: 8}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Input
            value={dataParams.search}
            placeholder="Search what you love..."
            icon={renderIcon}
            // onIconPress={handleSubmit}
            onChangeText={handleChange}
            size="small"
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ShoppingCart')}>
            <View style={{position: 'relative'}}>
              <Text style={styles.badge} category="c2">
                {totalCart}
              </Text>
              <Icon
                name="shopping-cart"
                width={32}
                height={32}
                fill="#fff"
                style={{flex: 1, marginRight: 16}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.productContainer}
        showsVerticalScrollIndicator={false}
        // pagingEnabled={true}
        // onScroll={onScroll}
      >
        <View style={styles.containerSelect}>
          <Select
            style={styles.select}
            data={[
              {text: 'Name', value: 'name'},
              {text: 'Category', value: 'category'},
            ]}
            placeholder="Sort By"
            selectedOption={selectedItem.sortby}
            onSelect={onSelect('sortby')}
          />
          <Select
            style={styles.select}
            data={[
              {text: 'Ascending', value: 'asc'},
              {text: 'Descending', value: 'desc'},
            ]}
            placeholder="Order By"
            selectedOption={selectedItem.orderby}
            onSelect={onSelect('orderby')}
          />
        </View>
        <View
          style={[
            styles.container,
            isLoading ? {justifyContent: 'center'} : null,
          ]}>
          {isLoading ? (
            <Spinner />
          ) : (
            productList.map((item, index) => (
              <ProductOrderItem
                item={item}
                key={index}
                onPress={() => handleSelectedProduct(item)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 2,
    marginHorizontal: 16,
    // marginRight: ,
    marginTop: 8,
    backgroundColor: 'white',
  },
  containerSelect: {
    flexDirection: 'row',
    marginHorizontal: 4,
    marginBottom: 8,
  },
  select: {
    flex: 1,
  },
  productContainer: {
    // flex: 1,
    marginHorizontal: 8,
    paddingTop: 8,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productItem: {
    // flex: 1,
    height: 300,
    // margin: 8,
    padding: 8,
    width: '50%',
  },
  productContent: {
    // position: 'relative',
    backgroundColor: 'white',
    height: '100%',
    // backgroundColor: 'red',
    borderRadius: 8,
  },
  badge: {
    position: 'absolute',
    borderRadius: 16,
    backgroundColor: '#FF3D71',
    color: 'white',
    paddingHorizontal: 4,
    zIndex: 999,
    right: 12,
  },
});

export default OrderScreen;
