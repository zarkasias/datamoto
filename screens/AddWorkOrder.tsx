import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Form, Item, Input, Label } from 'native-base';

import PickerSelect from 'react-native-picker-select';

import FontIcon from 'react-native-vector-icons/FontAwesome5';

import { FormHeader } from '../components/FormHeader'

import MainStyles from '../assets/styles/MainStyles'
import FormStyles from '../assets/styles/FormStyles'
import GLOBAL from '../global'

export default class AddWorkOrder extends Component {

    

    state = {
        customer: undefined,
        message: undefined,
        billToId: undefined,
        billToClient: undefined,
        shipToId: undefined,
        shipToClient: undefined,
        orderNumber: '000002'
    };  


    componentDidMount() {
        const reminder = this.props.navigation.getParam('reminder');

        if (reminder) {
            this.setState({
                customer: reminder.customer || undefined,
                message: reminder.message || undefined
            });
        }
    };


    savereminder = () => {
        console.log(this.state);
    }


    render() {

        const customerplaceholder = { label: 'Customer', value: null, color: '#a6a6a6'};

        let savebtn = <TouchableOpacity style={{ marginRight: 20 }} onPress={this.savereminder} key="savebtn"><Text style={{ color: GLOBAL.headerBackground, fontWeight: '600' }}>SAVE</Text></TouchableOpacity>;

        return(
            <View style={MainStyles.container}>
                <FormHeader title="New WorkOrder" navigation={this.props.navigation} props={[savebtn]} />
                

                <Form style={FormStyles.clientform}>
                <View style={{ marginTop: 25}} />     
                <View style={FormStyles.twoitemcontainer}> 
                <Item style={[FormStyles.smallitempicker, FormStyles.noborder]}>
                        <PickerSelect value={this.state.billToClient} onValueChange={(e) => this.setState({country: e})}
                            placeholder={customerplaceholder}    
                            style={{...pickerSelectStyles,
                                iconContainer: {
                                    top: 15,
                                    right: 0,
                                }}}    
                            items={GLOBAL.countries}
                            Icon={() => {
                                return <FontIcon name="caret-down" size={24} color="#000" />;
                            }} />
                        </Item>   
                    <Item floatingLabel style={FormStyles.smallitem}>
                        <Label style={FormStyles.label}>Zip Code</Label>
                        <Input value={this.state.orderNumber}  />
                    </Item>  
                    </View>
                </Form>

            </View>
        )
    }
}

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