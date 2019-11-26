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
        worder: this.props.navigation.getParam('workorder'),
        addressList: this.props.navigation.getParam('client', {}).contact,
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
        lineItem: this.props.navigation.getParam('workorder').lineItem,
        shippingAddress: undefined,
        orderEstimatedDeliveryDate: undefined,
        term: undefined,
        discountTotal: undefined,
        taxTotal: undefined
    };


    componentDidMount() {
        this.state.client= this.props.navigation.getParam('client', {});
        this.state.addressList = this.props.navigation.getParam('client', {}).contact;
        const worder = this.props.navigation.getParam('workorder');
        //console.log(this.state.client);
        if (worder) {
            console.log('passed workorder:');
            //console.log(worder);
            this.setState({
                id: worder.id ,
                type: worder.type,
                clientid: worder.clientid,
                clientContactId: worder.clientContactId,
                orderDate: worder.orderDate,
                status: worder.status ,
                notesInternal: worder.notesInternal ,
                notesForClient: worder.notesForClient,
                createdForUsername: worder.createdForUsername,
                currency: worder.currency,
                companyid: worder.companyid,
                ordertotal: worder.ordertotal,
                orderNumber: worder.orderNumber,
                userWhoCreated: worder.userWhoCreated,
                createDate: worder.createDate,
                lastUpdateDate: worder.lastUpdateDate,
                clientName: worder.clientName,
                language: worder.language,
                billToId: worder.billToId,
                shippToId: worder.shippToId,
                shipmthd: worder.shipmthd,
                expiryDate: worder.expiryDate,
                signature: worder.signature,
                printSignName: worder.printSignName,
                signDate: worder.signDate,
                invoiceId: worder.invoiceId,
                invoiceNumber: worder.invoiceNumber,
                soNumber: worder.soNumber,
                poNumber: worder.poNumber,
                conversionRate: worder.conversionRate,
                conversionDate: worder.conversionDate,
                lineItem: worder.lineItem,
                shippingAddress: worder.shippingAddress,
                orderEstimatedDeliveryDate: worder.orderEstimatedDeliveryDate,
                term: worder.term,
                discountTotal: worder.discountTotal,
                taxTotal: worder.taxTotal
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
         //console.log(wo);
         this.props.navigation.navigate('WorkOrderList');
         })();
    }

    addressFormat(contact) {

      let addr = "";
      let nl = false;
      if (contact.fname) {
        addr = contact.fname + " ";
        nl = true;
      }
      if (contact.lname) {
        addr = addr + contact.lname + " ";
        nl = true;
      }
      if (nl === true) {
        addr = addr + "\n";
      }
      nl = false;
      if (contact.addr1) {
        addr = addr + contact.addr1 + "\n";
      }
      if (contact.addr2) {
        addr = addr + contact.addr2 + "\n";
      }
      if (contact.city) {
        addr = addr + contact.city + ", ";
        nl = true;
      }
      if (contact.state) {
        addr = addr + contact.state + " ";
        nl = true;
      }
      if (contact.zip) {
        addr = addr + contact.zip;
        nl = true;
      }
      if (nl === true) {
        addr = addr + "\n";
      }
      if (contact.country) {
        addr = addr + contact.country;
      }

      let ret = {};
      ret.address = addr;
      ret.id = contact.id;

      return ret;
    }

    render() {
        console.log('addressList............');
        console.log(this.state.addressList);
        // Just checking....
        if (this.state.addressList && this.state.addressList.length > 0) {
          console.log(this.addressFormat(this.state.addressList[0]));
        }

        const customerplaceholder = { label: 'Customer', value: null, color: '#a6a6a6'};

        let savebtn = <TouchableOpacity style={{ marginRight: 20 }} onPress={this.saveworkorder} key="savebtn"><Text style={{ color: GLOBAL.headerBackground, fontWeight: '600' }}>SAVE</Text></TouchableOpacity>;

        var orderItems = [];
        if (this.state.lineItem) {
        	for(let i = 0; i < this.state.lineItem.length; i++){
            let ln = this.state.lineItem[i];
        		orderItems.push(
              <Item key = {i} last style={FormStyles.item}>
              <Label style={MainStyles.clientname}>{ln.item} | </Label>
              <Label style={MainStyles.clientname}>{ln.description} | </Label>
              <Label style={MainStyles.clientname}>{ln.qty} | </Label>
              <Label style={MainStyles.clientname}>{ln.unitPrice}</Label>
              </Item>
        		)
        	}
        }

        return(
            <View style={MainStyles.container}>
                <FormHeader title="New WorkOrder" navigation={this.props.navigation} props={[savebtn]} />



                <Form style={FormStyles.clientform}>
                <View style={{ marginTop: 2}} />


                <Item last style={FormStyles.item}>
                <Label style={MainStyles.clientname}>{this.state.clientName}</Label>
                </Item>

                <Item last style={FormStyles.item}>
                <Label style={MainStyles.clientname}>Total amount (USD)</Label>
                <Label style={MainStyles.clientname}>{this.state.ordertotal}</Label>
                </Item>

                <Item last style={FormStyles.item}>
                <Label style={MainStyles.clientname}>Billed to</Label>
                <Label style={MainStyles.clientname}>{this.state.billToId}</Label>
                </Item>

                <Item last style={FormStyles.item}>
                <Label style={MainStyles.clientname}>Shipped to</Label>
                <Label style={MainStyles.clientname}>{this.state.shippingAddress}</Label>
                </Item>

                <Item last style={FormStyles.item}>
                <Label style={MainStyles.clientname}>Workorder #</Label>
                <Label style={MainStyles.clientname}>{this.state.orderNumber}</Label>
                </Item>

                <Item last style={FormStyles.item}>
                <Label style={MainStyles.clientname}>Date of issue</Label>
                <Label style={MainStyles.clientname}>{this.state.orderDate}</Label>
                </Item>

                <Item last style={FormStyles.item}>
                <Label style={MainStyles.clientname}>Estimated due date</Label>
                <Label style={MainStyles.clientname}>{this.state.orderEstimatedDeliveryDate}</Label>
                </Item>

                <Item last style={FormStyles.item}>
                <Label style={MainStyles.clientname}>Reference SO#</Label>
                <Label style={MainStyles.clientname}>{this.state.soNumber}</Label>
                </Item>

                <Item last style={FormStyles.item}>
                <Label style={MainStyles.clientname}>Terms</Label>
                <Label style={MainStyles.clientname}>{this.state.term}</Label>
                </Item>

                <Item last style={FormStyles.item}>
                <Label style={MainStyles.clientname}>Approved by</Label>
                <Label style={MainStyles.clientname}>{this.state.printSignName}</Label>
                </Item>

                <Item last style={FormStyles.item}>
                <Label style={MainStyles.clientname}>Line items of this Workorder...</Label>
                </Item>

                {orderItems}




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
