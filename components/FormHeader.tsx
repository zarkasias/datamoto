import React from 'react'
import { Dimensions, Text, View, TouchableOpacity, StatusBar, StyleSheet, Platform } from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import GLOBAL from '../global'

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;


export const FormHeader = ({title, navigation, props}) => {

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <View style = { styles.container }>
      <StatusBar barStyle = 'light-content' />
      <View style = { styles.status }/>
      <View style={styles.header}><TouchableOpacity style= {{ marginLeft: 10 }}  onPress={goBack}>
          <FontIcon name={"times"} size={24} color={'#333'} />
        </TouchableOpacity>
        <Text style={styles.headertitle}>{title}</Text>
        {props}
      </View>
    </View>
  )};    
  

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 86 : 106;

  const styles = StyleSheet.create({
    container: {
      flex: 0,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: '#ccc',
      elevation: 4,
      shadowOffset: { width: 4, height: 4 },
      shadowColor: "grey",
      shadowOpacity: 0.5,
      shadowRadius: 5
  },
    status: {
      zIndex: 10,
      elevation: 2,
      width: DEVICE_WIDTH,
      height: STATUSBAR_HEIGHT,
      backgroundColor: '#00348a'
  },
    header: {
      flex: 0,
      flexDirection: 'row',
      width: DEVICE_WIDTH,
      backgroundColor: '#fff',
      height: APPBAR_HEIGHT,
      alignItems: 'center'
    },
    headertitle: {
      flexGrow: 1,
      fontSize: 20,
      marginLeft: 20,
      color: '#333',
      fontWeight: '500',
      textAlign: 'left'
    }
  });
  