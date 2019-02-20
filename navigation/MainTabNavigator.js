import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const barStyle = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'orange',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
}
const HomeStack = createStackNavigator({
  Home: HomeScreen,
  ProductDetail: ProductDetailScreen
}, barStyle
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Produtos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
},
  {
    tabBarOptions: {
      activeTintColor: '#474747',
      inactiveTintColor : '#474747',
      
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#fcfcfc',
      },
    }
  }
);
