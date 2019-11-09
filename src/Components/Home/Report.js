import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Text, Layout} from 'react-native-ui-kitten';
const {height, width} = Dimensions.get('window');

const Report = props => {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.appBar}>
          <Image
            source={require('../../../assets/logo-white.png')}
            resizeMode="center"
            style={{width: '15%', height: '100%', marginRight: 16}}
          />
          <Text
            category="h5"
            style={{fontFamily: 'Merriweather-Bold', color: 'white'}}>
            The Warungs
          </Text>
        </View>
      </View>
      <ScrollView
        style={styles.layoutContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <Layout style={styles.layout}>
          <Text style={styles.reportTitle} category="p1">
            Total Order
          </Text>
          <Text category="h5" style={styles.textContent}>
            3000
          </Text>
        </Layout>

        <Layout style={styles.layout}>
          <Text style={styles.reportTitle} category="p1">
            This Year's Income
          </Text>
          <Text category="h5" style={styles.textContent}>
            Rp 60.000.000
          </Text>
        </Layout>
        <Layout style={styles.layout}>
          <Text style={styles.reportTitle} category="p1">
            This Year's Income
          </Text>
          <Text category="h5" style={styles.textContent}>
            Rp 60.000.000
          </Text>
        </Layout>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: height / 2.8,
  },
  background: {
    height: '80%',
    backgroundColor: '#1890ff',
    padding: 16,
    // borderBottomLeftRadius: 75,
  },
  layoutContainer: {
    position: 'absolute',
    bottom: 0,
  },
  layout: {
    width: 250,
    height: 130,
    padding: 24,
    borderRadius: 8,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  reportTitle: {
    fontFamily: 'Merriweather-Regular',
    color: '#969696',
  },
  textContent: {
    marginTop: 8,
    fontFamily: 'Merriweather-Bold',
  },
  appBar: {
    // backgroundColor: 'white',
    // borderRadius: 8,
    height: '40%',
    // padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Report;
