import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, DatePickerIOS, DatePickerAndroid, Platform } from 'react-native'
import { Form, Item, Input,  Label, Button } from 'native-base';

import PickerSelect from 'react-native-picker-select';

import FontIcon from 'react-native-vector-icons/FontAwesome5';

import { FormHeader } from '../components/FormHeader'

import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

import MainStyles from '../assets/styles/MainStyles'
import FormStyles from '../assets/styles/FormStyles'
import GLOBAL from '../global'

export default class AddReminder extends Component {

    state = {
        customer: undefined,
        id: undefined,
        message: undefined,
        due: new Date(),
        isDateTimePickerVisible: false,
        client: this.props.navigation.getParam('client', {}),
        androidDate: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
    };


    componentDidMount() {
        console.log('componentDidMount...')

        this.state.client= this.props.navigation.getParam('client', {});
        const reminder = this.props.navigation.getParam('reminder');

        if (reminder) {
            let pdate = new Date(reminder.pendingActivityDate);
            this.setState({
                customer: reminder.companyName ,
                message: reminder.log ,
                due: reminder.pendingActivityDate,
                id: reminder.id,
                androidDate: `${pdate.getDate()}/${pdate.getMonth() + 1}/${pdate.getFullYear()}`
            });
            console.log('client ...');
            console.log(this.state.client.id);
            if (this.state.client.id) {
              //No-op
            } else {
              console.log('setting client name...')
              this.state.client.name = reminder.companyName;
              this.state.client.id = reminder.clientId;
            }
        }

    };

    showDateTimePicker = () => {
      this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
      this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
      console.log("A date has been picked: ", date);
      this.hideDateTimePicker();
    };

    /*
    setDate = (event, date) => {
      console.log(date);
      date = date || this.state.due;
      this.state.due = date;
      this.hideDateTimePicker();
    }*/
    setDate(newDate) {
      this.setState({ due: newDate });
    }

    setDateAndroid = async () => {
      try {
        const {
          action, year, month, day,
        } = await DatePickerAndroid.open({
        date: new Date(),
        minDate: new Date(),
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          this.setState({ due: `${day}/${month + 1}/${year}` });
          this.setState({ androidDate: `${day}/${month + 1}/${year}` });
        }
      } catch ({ code, message }) {
        console.warn('Cannot open date picker', message);
      }
    }

    formatDate(d) {
      let date;
      console.log(d); //25/11/2019
      if (d instanceof Date) {
        date = d;
      } else {
        let dd = d.split('/', 3);
        console.log(dd);
        date = new Date(dd[2], dd[1] -1, dd[0]);
      }
      console.log(date);
      var monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return monthNames[monthIndex] + ' ' + day + ', ' +  year + ' 1:01:01 AM'; //24 November 2019
    }

    savereminder = () => {
        console.log('saving' + this.state);
        console.log(this.state);
        console.log(this.state.id);
        let mthd = 'addCustomerReminder';
        if (this.state.id) {
          mthd = 'updateCustomerReminder';
        }
        console.log('mthd: ' + mthd);
        console.log('clientid: ' + this.state.client.id);
        console.log('log: ' + this.state.message);
        console.log('due: ' + this.state.due);
        console.log('comp name: ' + this.state.client.name);
        let t = JSON.stringify({
          "apiKey": GLOBAL.apikey,
          "authToken": GLOBAL.authToken,
          "method": mthd,
          "id" : this.state.id,
          "clientId": this.state.client.id,
          "companyName": this.state.client.name,
          "log": this.state.message,
          "pendingActivityDate": this.formatDate(this.state.due)
        });
        console.log(t);
        (async () => {
         const rawResponse = await fetch(GLOBAL.apiURL + '/json/clientreminder/', {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({
             "apiKey": GLOBAL.apikey,
             "authToken": GLOBAL.authToken,
             "method": mthd,
             "id" : this.state.id,
             "clientId": this.state.client.id,
             "companyName": this.state.client.name,
             "log": this.state.message,
             "pendingActivityDate": this.formatDate(this.state.due)

         })
         });
         const clnt = await rawResponse.json();
         console.log(clnt);
         this.props.navigation.navigate('ReminderList');
         })();
    }


    render() {
        const date = this.state.due;
        let customerplaceholder = { label: 'Customer', value: null, color: '#a6a6a6'};
        if (this.state.client) {
          customerplaceholder = { label: this.state.client.name, value: this.state.client.name, color: '#a6a6a6'};
        }
        let savebtn = <TouchableOpacity style={{ marginRight: 20 }} onPress={this.savereminder} key="savebtn"><Text style={{ color: GLOBAL.headerBackground, fontWeight: '600' }}>SAVE</Text></TouchableOpacity>;

        return(
            <View style={MainStyles.container}>
                <FormHeader title="Cancel" navigation={this.props.navigation} props={[savebtn]} />


                <Form style={FormStyles.clientform}>
                <View style={{ marginTop: 25}} />
                    <Item last style={FormStyles.item}>
                    <Label style={MainStyles.clientname}>{this.state.client.name}</Label>
                    </Item>

                    <Item floatingLabel last style={FormStyles.item}>
                    <Label style={FormStyles.label}>Message</Label>
                    <Input value={this.state.message} onChangeText={(e) => this.setState({message: e})} />
                    </Item>

                    <View style={{ paddingTop: 30 }}>
                      <Item last style={FormStyles.item}>
                      <Label style={FormStyles.clientname}>Due date</Label>
                      {
                           Platform.OS === 'ios' ? (
                             <DatePickerIOS
                               date={chosenDate}
                               onDateChange={this.setDate}
                             />
                           ) : (
                             <View style={MainStyles.AndroidDatePickerWrap}>
                               <TouchableOpacity onPress={() => this.setDateAndroid()}>
                                 <View style={MainStyles.itemicon}>
                                   <Text style={[MainStyles.HistoryTimeText, { fontSize: 16 }]}>
                                     {this.state.androidDate} {'       '}
                                   </Text>
                                   <Icon name="ios-calendar" size={25} color="rgb(49, 49, 49)" margin="10" />
                                 </View>
                               </TouchableOpacity>
                             </View>
                           )
                     }
                     </Item>
                   </View>
                </Form>
            </View>
        )
    }
}

/*
<PickerSelect value={this.state.customer} onValueChange={(e) => this.setState({customer: e})}
    placeholder={customerplaceholder}
    style={{...pickerSelectStyles,
        iconContainer: {
            top: 18,
            right: 10,
    }}}
    items={GLOBAL.customers}
    Icon={() => {
        return <FontIcon name="caret-down" size={24} color="#000" />;
    }} />
*/

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
