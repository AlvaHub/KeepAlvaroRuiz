import React, { Component } from 'react';
import * as Common from './../components/Common';
import {MyText} from './../components/MyText';

import {

  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  TextInput

} from 'react-native';
import { Image, Input } from 'react-native-elements';
import { WebBrowser } from 'expo';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      refreshing: false,
      search: ''
    }
  }
  static navigationOptions = {
    title: 'Produtos',

  };
  componentDidMount() {

    this.getData();
  }
  getData = () => {
    Common.getData('https://apiadapter.ad5track.com/v2/ads/americanas?api=b2wads&category_id=228548&referer=https%3A%2F%2Fwww.americanas.com.br%2Fcategoria%2Flivros%2Fliteratura-nacional&sgs=VEPAT%3AVEPAT%7CMUET%3AMUET&size=10&term=Literatura%20Nacional&userAgent=Mozilla%2F5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_14_2%29%20AppleWebKit%2F605.1.15%20%28KHTML%2C%20like%20Gecko%29%20Version%2F12.0.2%20Safari%2F605.1.15&userId=ef5ce4569fbb53e13c09de4a84347d38d4b009fcfbe2e5e004c2b04cbd8f63dbf865dfceb26ed4f21e1e6f8e5466f4eb').then(data => {
      this.setState({ data: data.products, dataAll: data.products, loading: false, refreshing: false });
    })
  }
  filterData = search => {
    let text = search.toString().toUpperCase();
    this.state.data = this.state.dataAll.filter(x => x.name.toUpperCase().indexOf(text) >= 0);
    this.setState({ refresh: !this.state.refresh });
  }
  renderSeparator = () => {
    return (null)
  }
  renderHeader = () => {
    return (null)
  }
  handleClick = (x) => {
    this.props.navigation.navigate('ProductDetail', { 'product': x });

  }
  render() {
    return (
      <View style={styles.container}>
        <Input placeholder='Buscar...' leftIcon={{ type: 'font-awesome', name: 'search', color: 'gray' }}
          inputContainerStyle={{ borderBottomColor: 'white', paddingLeft: 5, backgroundColor: '#f2f2f2', borderRadius: 10, marginTop: 5, marginBottom: 5 }} inputStyle={{ paddingLeft: 10 }} onChangeText={this.filterData} />
        {this.state.loading ?
          <ActivityIndicator size="large" color="gray" animating style={{ top: '40%' }} />
          :
          <FlatList
            data={this.state.data}
            renderItem={({ item, index }) =>
              <TouchableOpacity onPress={this.handleClick.bind(this, item)} >
                <View style={[styles.myItem, (index % 2 == 0 ? styles.myAlternate : null)]} >
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image source={{ uri: item.img }} style={{ height: 80, width: 80 }}></Image>
                  </View>
                  <View style={{ flex: 2 }}>
                    <MyText>{item.name}</MyText>
                    
                
                    <View style={{ marginTop: 5 }} >
                      <MyText style={{ fontWeight: 'bold', marginTop: 3 }}>R$ {Common.formatNumber(item.price)}</MyText>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            }
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  myItem: {

    backgroundColor: '#efd28f',
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',

    minHeight: 50,
    color: 'white',
    fontSize: 20,
    margin: 5,
    borderRadius: 10,

  },
  myAlternate: {
    backgroundColor: '#ffeaba'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  
});
