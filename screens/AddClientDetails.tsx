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
        addr2: undefined,
        city: undefined,
        state: undefined,
        zip: undefined,
        country: undefined,
        phone: undefined,
        notes: undefined,
    }

    componentDidMount() {
        const clientinfo = this.props.navigation.getParam('info');

        if (clientinfo.contactinfo) {
            console.log(clientinfo.contactinfo);
            this.setState({
                fname: clientinfo.contactinfo.fname || undefined,
                lname: clientinfo.contactinfo.lname || undefined,
                addr1: clientinfo.contactinfo.addr1 || undefined,
                addr2: clientinfo.contactinfo.addr2 || undefined,
                city: clientinfo.contactinfo.city || undefined,
                state: clientinfo.contactinfo.state || undefined,
                zip: clientinfo.contactinfo.zip || undefined,
                country: clientinfo.contactinfo.country || undefined,
                phone: clientinfo.contactinfo.phone || undefined,
                notes: clientinfo.contactinfo.notes || undefined

            });
        }
    };

    saveclient = () => {
        console.log(this.state);

        (async () => {
         const rawResponse = await fetch(GLOBAL.apiURL + '/json/client/', {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({
             "apiKey": GLOBAL.apikey,
             "authToken": GLOBAL.authToken,
             "method": 'addCustomer',
             contact: [{
                  "fname": this.state.fname,
                  "lname": this.state.lname,
                  "email": this.state.clientinfo.email,
                  "addr1": this.state.addr1,
                  "addr2": this.state.addr2,
                  "city": this.state.city,
                  "zip": this.state.zip,
                  "state": this.state.state,
                  "country": this.state.country,
              }],
              "name": this.state.clientinfo.companyname,
              "salesTaxId": this.state.clientinfo.taxid,
              "country": this.state.clientinfo.country,
              "currency": this.state.clientinfo.currency,
              "language": this.state.clientinfo.language,
              "type": 1
         })
         });
         const clnt = await rawResponse.json();
         console.log(clnt);
         /*
         this.setState({
             loading: false,
             data: result,
             selection: []
           }); */
       })();
    }

    render() {

        const countryplaceholder = { label: 'Country', value: null, color: '#a6a6a6'};
        const stateplaceholder = { label: 'State', value: null, color: '#a6a6a6' };

        let savebtn = <TouchableOpacity style={{ marginRight: 20 }} onPress={this.saveclient} key="savebtn"><Text style={{ color: GLOBAL.headerBackground, fontWeight: '600' }}>SAVE</Text></TouchableOpacity>;

        return (
            <View style={MainStyles.container}>
                <FormHeader title="New Client" navigation={this.props.navigation} props={[savebtn]} />

                <Form style={FormStyles.clientform}>
                <View style={FormStyles.twoitemcontainer}>
                    <Item floatingLabel style={FormStyles.smallitem}>
                        <Label style={FormStyles.label}>First Name</Label>
                        <Input value={this.state.fname} onChangeText={(e) => this.setState({fname: e})}  />
                        </Item>
                        <Item floatingLabel style={FormStyles.smallitem}>
                        <Label style={FormStyles.label}>Last Name</Label>
                        <Input value={this.state.lname}  onChangeText={(e) => this.setState({lname: e})} />
                        </Item>
                    </View>
                    <Item floatingLabel style={FormStyles.item}>
                        <Label style={FormStyles.label}>Address</Label>
                        <Input value={this.state.addr1} onChangeText={(e) => this.setState({addr1: e})}  />
                    </Item>
                    <Item floatingLabel style={FormStyles.item}>
                        <Label style={FormStyles.label}>Address 2 (optional)</Label>
                        <Input value={this.state.addr2} onChangeText={(e) => this.setState({addr2: e})}  />
                    </Item>
                    <View style={FormStyles.twoitemcontainer}>
                    <Item floatingLabel style={FormStyles.smallitem}>
                        <Label style={FormStyles.label}>City</Label>
                        <Input value={this.state.city} onChangeText={(e) => this.setState({city: e})}  />
                    </Item>
                    <Item style={[FormStyles.smallitempicker, FormStyles.noborder]}>
                        <PickerSelect value={this.state.state} onValueChange={(e) => this.setState({state: e})}
                            placeholder={stateplaceholder}
                            style={{...pickerSelectStyles,
                                iconContainer: {
                                    top: 15,
                                    right: 0,
                                }}}
                            items={GLOBAL.states}
                            Icon={() => {
                                return <FontIcon name="caret-down" size={24} color="#000" />;
                            }} />
                        </Item>
                    </View>
                    <View style={FormStyles.twoitemcontainer}>
                    <Item floatingLabel style={FormStyles.smallitem}>
                        <Label style={FormStyles.label}>Zip Code</Label>
                        <Input value={this.state.zip} onChangeText={(e) => this.setState({zip: e})}  />
                    </Item>
                    <Item style={[FormStyles.smallitempicker, FormStyles.noborder]}>
                        <PickerSelect value={this.state.country} onValueChange={(e) => this.setState({country: e})}
                            placeholder={countryplaceholder}
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
                    </View>
                    <Item floatingLabel style={FormStyles.item}>
                        <Label style={FormStyles.label}>Phone</Label>
                        <Input value={this.state.phone} onChangeText={(e) => this.setState({phone: e})}  />
                    </Item>
                    <Item floatingLabel last style={FormStyles.item}>
                        <Label style={FormStyles.label}>Internal Notes</Label>
                        <Input value={this.state.notes} onChangeText={(e) => this.setState({notes: e})}  />
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
      width: 160,
      paddingVertical: 15,
      paddingHorizontal: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      color: '#000',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      marginLeft: 15,
      fontSize: 18,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      color: '#000',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
