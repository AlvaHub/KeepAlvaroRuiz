import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import {MyText} from './../components/MyText';
import * as Common from './../components/Common';

export default class ProductDetailScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('product').name,
    }
  };
  render() {
    const item = this.props.navigation.getParam('product');
    return (<View style={{ padding: 10 }}>
      <Image source={{ uri: item.img }} style={[styles.label, { height: 120, width: 120, borderRadius: 10, alignSelf: 'center' }]}></Image>
      <MyText style={[styles.label, { fontWeight: 'bold', fontSize : 18 }]}>{item.name}</MyText>
      <MyText style={[styles.label, { fontSize: 20, }]}>
        <MyText style={{ fontSize: 12 }}>Por Apenas</MyText> R$ {Common.formatNumber(item.price)}</MyText>
      <MyText style={[styles.label, { fontWeight: 'bold', color: 'orange' }]}>
        Editora:
      <MyText style={{ fontWeight: 'normal', color: 'black' }}> {item.seller}</MyText>
      </MyText>

    </View>)


  }
}
const styles = StyleSheet.create({
  label: { marginBottom: 20 }
})
