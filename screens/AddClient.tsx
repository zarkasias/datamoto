import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Form, Item, Input, Label } from 'native-base';

import PickerSelect from 'react-native-picker-select';

import FontIcon from 'react-native-vector-icons/FontAwesome5';

import { FormHeader } from '../components/FormHeader'

import MainStyles from '../assets/styles/MainStyles'
import FormStyles from '../assets/styles/FormStyles'
import GLOBAL from '../global'

export default class AddClient extends Component {

    state = {
        companyname: undefined,
        taxid: undefined,
        country: undefined,
        currency: undefined,
        language: undefined,
        email: undefined,
        addcontact: true,
        contactcolor: '#ccc'
    };  

    componentDidUpdate() {
        this._handleStateChange();
    }
    
  
      _handleStateChange = () => {
          let isdefined = [];
          const client = this.state;
          for (let i in client) {
              if ((i !== "taxid" && i !== "addcontact" && i !== "contactcolor")  && client[i] !== undefined) {
                  isdefined.push(i);
              }
          }    
          if (isdefined.length === 5 && this.state.addcontact) {
              this.setState({
                addcontact: false,
                contactcolor: GLOBAL.headerBackground
              })
          }
      }

    saveclient = () => {
        console.log(this.state);
    }

    addclientdetails = () => {
        const clientinfo = this.state;
        this.props.navigation.navigate("AddClientDetails", {
            info: clientinfo
        });
    }

    render() {

        const countryplaceholder = { label: 'Country', value: null, color: '#a6a6a6'};
        const currencyplaceholder = { label: 'Currency', value: null, color: '#a6a6a6'};
        const languageplaceholder = { label: 'Language', value: null, color: '#a6a6a6'};

        let savebtn = <TouchableOpacity style={{ marginRight: 20 }} onPress={this.saveclient} key="savebtn"><Text style={{ color: GLOBAL.headerBackground, fontWeight: '600' }}>SAVE</Text></TouchableOpacity>;

        return(
            <View style={MainStyles.container}>
                <FormHeader title="New Client" navigation={this.props.navigation} props={[savebtn]} />
                

                <Form style={FormStyles.clientform}>
                    <Item floatingLabel style={FormStyles.item}>
                    <Label style={FormStyles.label}>Company Name</Label>
                    <Input onChangeText={(e) => this.setState({companyname: e})}  />
                    </Item>
                    <Item floatingLabel style={FormStyles.item}>
                    <Label style={FormStyles.label}>VAT/TAX ID (optional)</Label>
                    <Input  onChangeText={(e) => this.setState({taxid: e})} />
                    </Item>
                    <View style={{ marginTop: 25}} />   
                    <PickerSelect value={this.state.country} onValueChange={(e) => this.setState({country: e})}
                    placeholder={countryplaceholder}    
                    style={{...pickerSelectStyles,
                        iconContainer: {
                            top: 18,
                            right: 10,
                          }}}    
                    items={GLOBAL.countries}
                    Icon={() => {
                        return <FontIcon name="caret-down" size={24} color="#000" />;
                    }} />
                    <View style={{ marginTop: 25}} />   
                    <PickerSelect value={this.state.currency} onValueChange={(e) => this.setState({currency: e})}
                    placeholder={currencyplaceholder}    
                    style={{...pickerSelectStyles,
                        iconContainer: {
                            top: 18,
                            right: 10,
                          }}}    
                    items={GLOBAL.currencies}
                    Icon={() => {
                        return <FontIcon name="caret-down" size={24} color="#000" />;
                    }} />
                    <View style={{ marginTop: 25}} />   
                    <PickerSelect value={this.state.language} onValueChange={(e) => this.setState({language: e})}
                    placeholder={languageplaceholder}    
                    style={{...pickerSelectStyles,
                        iconContainer: {
                            top: 18,
                            right: 10,
                          }}}    
                    items={GLOBAL.languages}
                    Icon={() => {
                        return <FontIcon name="caret-down" size={24} color="#000" />;
                    }} />
                    <Item floatingLabel last style={FormStyles.lastitem}>
                    <Label style={FormStyles.label}>Email</Label>
                    <Input textContentType="emailAddress"  onChangeText={(e) => this.setState({email: e})} />
                    </Item>
                    <View style={{ marginTop: 35}} /> 
                    <TouchableOpacity style={{ marginLeft: 10 }} disabled={this.state.addcontact} onPress={this.addclientdetails} key="savebtn"><Text style={{ color: this.state.contactcolor, fontSize: 21, fontWeight: '600' }}>ADD CONTACT ADDRESS</Text></TouchableOpacity>
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