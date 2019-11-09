import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Text, Spinner, Icon, Input, Button} from 'react-native-ui-kitten';
import TopNavigation from '../../Components/TopNavigation';

import {useSelector, useDispatch} from 'react-redux';
import {createNewCategory} from '../../Redux/Actions/category';

const {height, width} = Dimensions.get('window');

const AddModalCategory = props => {
  const [input, setInput] = React.useState({category_name: ''});
  const [statusError, setStatusError] = React.useState({
    status: '',
    message: '',
  });
  const {category, auth} = useSelector(state => ({
    category: state.category,
    auth: state.auth,
  }));

  const {categoryList, isLoading} = category;

  const dispatch = useDispatch();

  const handleChange = value => {
    setInput({category_name: value});
  };

  const handleSubmit = () => {
    dispatch(createNewCategory(auth.user.token, input))
      .then(response => {
        if (response.value.data.status === 200) {
          setStatusError({status: '', message: ''});
          Alert.alert(
            'Success',
            `Success added category ${input.category_name}`,
            [
              {
                text: 'Input Again',
                onPress: () => setInput({category_name: ''}),
              },
              {
                text: 'Done',
                onPress: () => props.navigation.navigate('CategoryScreen'),
              },
            ],
          );
        } else {
          setStatusError({
            status: 'danger',
            message: response.value.data.message,
          });
          // setError({status: 'danger', message: response.value.data.message});
          console.log(response.value.data, 'uye');
        }
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Failed', `Failed add category ${input.category_name}`);
      });
  };

  console.log(input, 'input');
  return (
    <View style={{backgroundColor: '#f2f5f7', height: '100%'}}>
      <TopNavigation
        navigation={props.navigation}
        title="Add Category"
        theme="light"
        showBack={true}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 16}}>
        <Text category="s1" style={{fontFamily: 'Merriweather-Regular'}}>
          Category Name
        </Text>
        <Input
          style={{backgroundColor: 'white', marginTop: 8}}
          placeholder="Input category name"
          onChangeText={handleChange}
          status={statusError.status}
          caption={statusError.message}
          value={input.category_name}
        />
      </ScrollView>
      <Button style={{margin: 16}} onPress={handleSubmit}>
        Add Category
      </Button>
      {isLoading ? (
        <View style={styles.loading}>
          <Spinner size="medium" />
          <Text style={[styles.fontFamily, styles.textLoading]}>
            loading...
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: 'Merriweather-Regular',
  },
  loading: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLoading: {color: 'rgba(52, 52, 52, 0.4)', marginTop: 12},
});

export default AddModalCategory;
