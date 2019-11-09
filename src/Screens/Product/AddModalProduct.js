import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Text,
  Spinner,
  Icon,
  Input,
  Button,
  Select,
} from 'react-native-ui-kitten';
import TopNavigation from '../../Components/TopNavigation';

import {useSelector, useDispatch} from 'react-redux';
import {createNewProduct} from '../../Redux/Actions/product';

const {height, width} = Dimensions.get('window');
import NumericInput from 'react-native-numeric-input';

const AddModalProduct = props => {
  const [categorySelectList, setCategorySelectList] = React.useState([]);
  React.useEffect(() => {
    // setInput({
    //   id: props.navigation.state.params.item.id,
    //   category_name: props.navigation.state.params.item.name,
    // });
    setCategorySelectList(() =>
      props.navigation.state.params.categoryList.map(item => ({
        text: item.name,
        value: item.id,
      })),
    );
  }, [props]);
  console.log(categorySelectList, 'navigate');
  const initialForm = {
    prod_name: '',
    prod_desc: '',
    prod_image: '',
    category_id: 1,
    price: 1000,
    quantity: 0,
  };
  //   const [submitValue, setSubmitValue] = useState(initialForm);
  const [input, setInput] = React.useState(initialForm);
  const [statusError, setStatusError] = React.useState({
    status: '',
    message: '',
  });
  const [selectedItem, setSelectedItem] = React.useState({
    category: '',
  });
  const {product, auth} = useSelector(state => ({
    product: state.product,
    auth: state.auth,
  }));

  //   const {categoryList, isLoading} = category;

  const dispatch = useDispatch();

  const onSelect = name => selectedOption => {
    setSelectedItem({...selectedItem, [name]: selectedOption});
    setInput({...input, category_id: selectedOption.value});
  };
  const handleChange = name => value => {
    setInput({...input, [name]: value});
  };

  console.log(input, 'input');

  const handleSubmit = () => {
    dispatch(createNewProduct(auth.user.token, input))
      .then(response => {
        if (response.value.data.status === 200) {
          setStatusError({status: '', message: ''});
          Alert.alert('Success', `Success added product ${input.prod_name}`, [
            {
              text: 'Input Again',
              onPress: () => setInput(initialForm),
            },
            {
              text: 'Done',
              onPress: () => props.navigation.navigate('ProductScreen'),
            },
          ]);
        } else {
          Alert.alert('Failed', response.value.data.message);
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
        Alert.alert('Failed', `Failed add product ${input.prod_name}`);
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
          Product Name
        </Text>
        <Input
          style={{backgroundColor: 'white', marginTop: 8}}
          placeholder="Input category name"
          onChangeText={handleChange('prod_name')}
          //   status={statusError.status}
          //   caption={statusError.message}
          value={input.prod_name}
        />
        <Text category="s1" style={{fontFamily: 'Merriweather-Regular'}}>
          Image Url
        </Text>
        <Input
          style={{backgroundColor: 'white', marginTop: 8}}
          placeholder="Input image url"
          onChangeText={handleChange('prod_image')}
          //   status={statusError.status}
          //   caption={statusError.message}
          value={input.prod_image}
        />

        <Text category="s1" style={{fontFamily: 'Merriweather-Regular'}}>
          Product Description
        </Text>
        <Input
          style={{backgroundColor: 'white', marginTop: 8}}
          placeholder="Input product description"
          onChangeText={handleChange('prod_desc')}
          //   status={statusError.status}
          //   caption={statusError.message}
          value={input.prod_desc}
        />

        <Text category="s1" style={{fontFamily: 'Merriweather-Regular'}}>
          Product Category
        </Text>
        <Select
          style={{marginTop: 8, backgroundColor: 'white', marginBottom: 16}}
          data={categorySelectList}
          placeholder="Category"
          selectedOption={selectedItem.category}
          onSelect={onSelect('category')}
        />
        <Text
          category="s1"
          style={{fontFamily: 'Merriweather-Regular', marginBottom: 8}}>
          Price
        </Text>
        <NumericInput
          type="up-down"
          onChange={handleChange('price')}
          //   style={{marginTop: 20}}
          value={input.price}
          minValue={1000}
          rounded
        />
        <Text
          category="s1"
          style={{fontFamily: 'Merriweather-Regular', marginVertical: 8}}>
          Quantity
        </Text>
        <NumericInput
          type="up-down"
          onChange={handleChange('quantity')}
          //   style={{marginTop: 20}}
          value={input.quantity}
          minValue={1}
          rounded
        />
      </ScrollView>
      <Button style={{margin: 16}} onPress={handleSubmit}>
        Add Category
      </Button>
      {product.isLoading ? (
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

export default AddModalProduct;
