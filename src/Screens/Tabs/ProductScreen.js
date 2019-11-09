import React from 'react';
import {
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Input, Icon, Select, Spinner, Text} from 'react-native-ui-kitten';
import TopNavigation from '../../Components/TopNavigation';

import ProductItem from '../../Components/Product/ProductItem';
import {useSelector, useDispatch} from 'react-redux';
import {getProduct} from '../../Redux/Actions/product';
import {getCategory} from '../../Redux/Actions/category';
// import { getProductInOrder } from '../../Redux/Actions/order';
const ProductScreen = props => {
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

  const onSelect = name => selectedOption => {
    setSelectedItem({...selectedItem, [name]: selectedOption});
    setDataParams({...dataParams, [name]: selectedOption.value});
  };

  const {product, auth, categoryList} = useSelector(state => ({
    product: state.product,
    auth: state.auth,
    categoryList: state.category.categoryList,
  }));

  const {isLoading, productList} = product;
  const dispatch = useDispatch();

  React.useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchData(dataParams);
      // fetchDataCallback(dataParams);
    }, 0);

    return () => clearTimeout(timeOut);
  }, [dataParams]);

  React.useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchCategoryCallback();
      // fetchDataCallback(dataParams);
    }, 0);

    return () => clearTimeout(timeOut);
  }, [fetchCategoryCallback]);

  const fetchData = async (params = {}) => {
    await dispatch(getProduct(auth.user.token, params));
  };

  const fetchCategory = async () => {
    await dispatch(getCategory(auth.user.token));
  };
  const fetchCategoryCallback = React.useCallback(fetchCategory, []);

  return (
    <View style={{backgroundColor: '#f2f5f7', height: '100%'}}>
      <TopNavigation
        // navigation={props.navigation}
        title="Product"
        theme="light"
        showBack={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 16}}>
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
        <View>
          {isLoading ? (
            <Spinner />
          ) : (
            productList.map((item, index) => (
              <ProductItem
                item={item}
                key={index}
                navigation={props.navigation}
              />
            ))
          )}
        </View>
      </ScrollView>
      {console.log(categoryList, 'category')}
      <TouchableOpacity
        onPress={() => props.navigation.navigate('AddProduct', {categoryList})}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: 16,
          right: 16,
          height: 70,
          backgroundColor: '#1890ff',
          borderRadius: 100,
          shadowColor: '#1890ff',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,

          elevation: 6,
        }}>
        <Icon name="plus" width={24} height={24} fill="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSelect: {
    flexDirection: 'row',
    // marginHorizontal: 4,
    marginBottom: 8,
  },
  select: {
    flex: 1,
  },
});

export default ProductScreen;
