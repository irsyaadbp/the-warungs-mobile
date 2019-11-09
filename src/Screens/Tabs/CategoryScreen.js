import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {Text, Spinner, Icon} from 'react-native-ui-kitten';
import TopNavigation from '../../Components/TopNavigation';
import CategoryItem from '../../Components/Category/CategoryItem';

import {useSelector, useDispatch} from 'react-redux';
import {getCategory} from '../../Redux/Actions/category';

const CategoryScreen = props => {
  const {category, auth} = useSelector(state => ({
    category: state.category,
    auth: state.auth,
  }));

  const {categoryList, isLoading} = category;
  //
  const dispatch = useDispatch();
  React.useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchData({});
      // fetchDataCallback(dataParams);
    }, 0);

    return () => clearTimeout(timeOut);
  }, []);

  const fetchData = async (params = {}) => {
    await dispatch(getCategory(auth.user.token, params));
  };
  return (
    <View style={{backgroundColor: '#f2f5f7', height: '100%'}}>
      <TopNavigation
        navigation={props.navigation}
        title="Category"
        theme="light"
        showBack={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 16}}>
        {/* {console.log(isLoading)} */}
        {isLoading ? (
          <Spinner />
        ) : categoryList.length === 0 ? null : (
          categoryList.map((item, index) => (
            <CategoryItem
              item={item}
              key={index}
              navigation={props.navigation}
            />
          ))
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('AddCategory')}
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

export default CategoryScreen;
