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
        client: this.props.navigation.getParam('client', {}),
        id: undefined,
        type: undefined,
        clientid: undefined,
        clientContactId: undefined,
        orderDate: undefined,
        status: undefined,
        notesInternal: undefined,
        notesForClient: undefined,
        createdForUsername: undefined,
        currency: undefined,
        companyid: undefined,
        ordertotal: undefined,
        orderNumber: undefined,
        userWhoCreated: undefined,
        createDate: undefined,
        lastUpdateDate: undefined,
        clientName: undefined,
        language: undefined,
        billToId: undefined,
        shippToId: undefined,
        shipmthd: undefined,
        expiryDate: undefined,
        signature: undefined,
        printSignName: undefined,
        signDate: undefined,
        invoiceId: undefined,
        invoiceNumber: undefined,
        soNumber: undefined,
        poNumber: undefined,
        conversionRate: undefined,
        conversionDate: undefined,
        lineItem: undefined,
        shippingAddress: undefined,
        orderEstimatedDeliveryDate: undefined,
        term: undefined,
        discountTotal: undefined,
        taxTotal: undefined
    };


    componentDidMount() {
        this.state.client= this.props.navigation.getParam('client', {});
        const worder = this.props.navigation.getParam('workorder');

        if (worder) {
            this.setState({
                id: worder.id || undefined,
                type: worder.type || undefined,
                clientid: worder.clientid || undefined,
                clientContactId: worder.clientContactId || undefined,
                orderDate: worder.orderDate || undefined,
                status: worder.status || undefined,
                notesInternal: worder.notesInternal || undefined,
                notesForClient: worder.notesForClient || undefined,
                createdForUsername: worder.createdForUsername || undefined,
                currency: worder.currency || undefined,
                companyid: worder.companyid || undefined,
                ordertotal: worder.ordertotal || undefined,
                orderNumber: worder.orderNumber || undefined,
                userWhoCreated: worder.userWhoCreated || undefined,
                createDate: worder.createDate || undefined,
                lastUpdateDate: worder.lastUpdateDate || undefined,
                clientName: worder.clientName || undefined,
                language: worder.language || undefined,
                billToId: worder.billToId || undefined,
                shippToId: worder.shippToId || undefined,
                shipmthd: worder.shipmthd || undefined,
                expiryDate: worder.expiryDate || undefined,
                signature: worder.signature || undefined,
                printSignName: worder.printSignName || undefined,
                signDate: worder.signDate || undefined,
                invoiceId: worder.invoiceId || undefined,
                invoiceNumber: worder.invoiceNumber || undefined,
                soNumber: worder.soNumber || undefined,
                poNumber: worder.poNumber || undefined,
                conversionRate: worder.conversionRate || undefined,
                conversionDate: worder.conversionDate || undefined,
                lineItem: worder.lineItem || undefined,
                shippingAddress: worder.shippingAddress || undefined,
                orderEstimatedDeliveryDate: worder.orderEstimatedDeliveryDate || undefined,
                term: worder.term || undefined,
                discountTotal: worder.discountTotal || undefined,
                taxTotal: worder.taxTotal || undefined
            });
        }
    };


    saveworkorder = () => {
        console.log(this.state);
        let mthd = 'addWorkorder';
        if (this.state.id) {
          mthd = 'updateWorkorder';
        }
        (async () => {
         const rawResponse = await fetch(GLOBAL.apiURL + '/json/clientasset/', {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({
             "apiKey": GLOBAL.apikey,
             "authToken": GLOBAL.authToken,
             "method": mthd,
             "clientid": this.state.client.id,
             "id": this.state.id,


             "clientContactId": this.state.clientContactId,
             "orderDate": now(),
             "notesInternal": this.state.notesInternal,
             "notesForClient": this.state.notesForClient,

             "currency": this.state.currency,
             "companyid": this.state.companyid,
             "orderNumber": this.state.orderNumber,
             "lastUpdateDate": now(),
             "clientName": this.state.clientName,
             "language": this.state.language,
             "billToId": this.state.billToId,
             "shippToId": this.state.shippToId,
             "shipmthd": this.state.shipmthd,
             "expiryDate": this.state.expiryDate,
             "signature": this.state.signature,
             "printSignName": this.state.printSignName,
             "signDate": this.state.signDate,

             "soNumber": this.state.soNumber,
             "conversionRate": this.state.conversionRate,
             "conversionDate": this.state.conversionDate,
             "lineItem": this.state.lineItem,
             "shippingAddress": this.state.shippingAddress,
             "orderEstimatedDeliveryDate": this.state.orderEstimatedDeliveryDate,
             "term": this.state.term

         })
         });
         const wo = await rawResponse.json();
         console.log(wo);
         this.props.navigation.navigate('WorkOrderList');
         })();
    }


    render() {

        const customerplaceholder = { label: 'Customer', value: null, color: '#a6a6a6'};

        let savebtn = <TouchableOpacity style={{ marginRight: 20 }} onPress={this.saveworkorder} key="savebtn"><Text style={{ color: GLOBAL.headerBackground, fontWeight: '600' }}>SAVE</Text></TouchableOpacity>;

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
