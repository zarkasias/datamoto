import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Form, Item, Input, Label } from 'native-base';

import PickerSelect from 'react-native-picker-select';

import FontIcon from 'react-native-vector-icons/FontAwesome5';

import { FormHeader } from '../components/FormHeader'

import MainStyles from '../assets/styles/MainStyles'
import FormStyles from '../assets/styles/FormStyles'
import GLOBAL from '../global'

export default class AddClientDetails extends Component {

    state = {
        clientinfo: this.props.navigation.getParam('info', null),
        fname: undefined,
        lname: undefined,
        addr1: undefined,
        addr2: undefined
    }

    saveclient = () => {
        console.log(this.state);
    }

    render() {

        let savebtn = <TouchableOpacity style={{ marginRight: 20 }} onPress={this.saveclient} key="savebtn"><Text style={{ color: GLOBAL.headerBackground, fontWeight: '600' }}>SAVE</Text></TouchableOpacity>;

        return (
            <View style={MainStyles.container}>
                <FormHeader title="New Client" navigation={this.props.navigation} props={[savebtn]} />
                
                <Form style={FormStyles.clientform}>
                <View style={FormStyles.twoitemcontainer}>  
                    <Item floatingLabel style={FormStyles.smallitem}>
                        <Label style={FormStyles.label}>First Name</Label>
                        <Input onChangeText={(e) => this.setState({fname: e})}  />
                        </Item>
                        <Item floatingLabel style={FormStyles.smallitem}>
                        <Label style={FormStyles.label}>Last Name</Label>
                        <Input  onChangeText={(e) => this.setState({lname: e})} />
                        </Item>
                    </View>
                    <Item floatingLabel style={FormStyles.item}>
                        <Label style={FormStyles.label}>Address</Label>
                        <Input onChangeText={(e) => this.setState({addr1: e})}  />
                    </Item> 
                    <Item floatingLabel style={FormStyles.item}>
                        <Label style={FormStyles.label}>Address 2 (optional)</Label>
                        <Input onChangeText={(e) => this.setState({addr2: e})}  />
                    </Item>     
                </Form>    
            </View>
            
        )
    }

};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      marginLeft: 15,
      fontSize: 18,
      paddingVertical: 12,
      paddingHorizontal: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      color: '#000',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 18,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      color: '#000',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });