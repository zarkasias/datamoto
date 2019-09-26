import React from 'react';

import { 
  Alert,
  View
} from 'react-native'

import Styles from '../assets/styles/MainStyles'


export function AlertSelection(message: string) {
  Alert.alert(
    'Alert',
    message,
    [
      { text: "OK", onPress: () => console.log('OK Pressed') }
    ],
    { cancelable: false }
  )
}

export function AlertDeletion(fnOkCallBack) {
  Alert.alert(
    'Delete',
    'Delete this document?',
    [
      {text: "YES", onPress: fnOkCallBack},
      {text: "NO", onPress: () => console.log('No Pressed') }
    ],
    { cancelable: false }
  )
}

export const FlatListItemSeparator = () => <View style={Styles.line} />