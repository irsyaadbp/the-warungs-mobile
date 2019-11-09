import React from 'react';
import {View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {Text, Icon} from 'react-native-ui-kitten';
import TopNavigation from '../../Components/TopNavigation';
import {useSelector, useDispatch} from 'react-redux';
import {deleteCategory} from '../../Redux/Actions/category';

const CategoryItem = props => {
  //   const {auth} = useSelector(state => state.auth);
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const deleteCategoryId = category => {
    Alert.alert('Delete', `Are you sure to delete ${category.name} ?`, [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          //   console.log(auth);
          dispatch(deleteCategory(user.token, category.id))
            .then(response => {
              if (response.value.data.status === 200) {
                Alert.alert(
                  'Success',
                  `Category ${category.name} successfully deleted`,
                );
              } else {
                Alert.alert(
                  'Failed',
                  `Deleted failed category ${category.name}`,
                );
              }
              //   if(resonse.value)
            })
            .catch(err =>
              Alert.alert('Failed', `Deleted failed category ${category.name}`),
            );
        },
      },
    ]);
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: 60,
        width: '100%',
        borderRadius: 8,
        padding: 16,
        justifyContent: 'space-between',
        marginBottom: 8,
        flexDirection: 'row',
      }}>
      <Text
        style={{
          fontFamily: 'Merriweather-Bold',
          alignSelf: 'center',
        }}>
        {props.item.name}
      </Text>
      {props.item.id !== 1 ? (
        <View style={{alignSelf: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('EditCategory', {item: props.item})
            }>
            <Icon
              name="edit"
              width={24}
              height={24}
              fill="#00B383"
              style={{marginRight: 16}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteCategoryId(props.item)}>
            <Icon name="trash-2" width={24} height={24} fill="#FF3D71" />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default CategoryItem;
