import React from 'react';
import { Text } from 'react-native';

export function MyText (props){
  return <Text  {...this.props} style={[{ fontSize: 16}, props.style]}>{props.children}</Text>
}