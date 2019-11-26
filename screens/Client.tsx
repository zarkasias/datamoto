import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, CardItem } from 'native-base';

import FontIcon from 'react-native-vector-icons/FontAwesome5';

import { CustomHeader } from '../components/Header'

import MainStyles from '../assets/styles/MainStyles'
import GLOBAL from '../global'

import { AlertDeletion, FlatListItemSeparator } from '../components/Helpers'

export default class Client extends Component {

    state = {
        client: this.props.navigation.getParam('client', {})
    };


    clientname = (fname, lname) => {
        return fname + " " + lname;
    }

    fName = (data) => {
      if (data.contact) {
        if (data.contact[0]) {
          return data.contact[0].fname;
        }
      }
    }

    lName = (data) => {
      if (data.contact) {
        if (data.contact[0]) {
          return data.contact[0].lname;
        }
      }
    }

    clientInitials = (name) => {
      s = "";
      if (name) {
        let compname = name.split(" ", 2);
        s = compname[0].charAt(0);
        if (compname.length > 1) {
          s = s + compname[1].charAt(0);
        } else if (compname[0].charAt(1)) {
          s = s + compname[0].charAt(1);
        } else {
          s = s + compname[0].charAt(0);
        }
      }
      return s.toUpperCase();
    };

    confirmDeletion = () => {
        AlertDeletion(this.deleteclient);
    }

    toWorkorderList = () => {
      this.props.navigation.navigate("WorkOrderList", {
        client: this.state.client
      });
    }

    toReminderList = () => {
      this.props.navigation.navigate("ReminderList", {
        client: this.state.client
      });
    }

    toAssetList = () => {
        this.props.navigation.navigate("AssetList", {
          client: this.state.client
        });
    }

    deleteclient = () => {
        console.log('delete client called');
    }

    editclient = () => {
        this.props.navigation.navigate("AddClient", {
            client: this.state.client
        });
    }

    render() {

        const { client } = this.state;
        let wbtn = <TouchableOpacity style={{ marginRight: 20 }} key="wbtn" onPress={this.toWorkorderList}><FontIcon name="tasks" size={16} color={'#f5fcff'} /></TouchableOpacity>;
        let rbtn = <TouchableOpacity style={{ marginRight: 20 }} key="rbtn" onPress={this.toReminderList}><FontIcon name="bell" size={16} color={'#f5fcff'} /></TouchableOpacity>;
        let compbtn = <TouchableOpacity style={{ marginRight: 20 }} key="compbtn" onPress={this.toAssetList}><FontIcon name="desktop" size={16} color={'#f5fcff'} /></TouchableOpacity>;
        let editbtn = <TouchableOpacity style={{ marginRight: 20 }} key="editbtn" onPress={this.editclient}><FontIcon name="pencil-alt" size={16} color={'#f5fcff'} /></TouchableOpacity>;
        let deletebtn = <TouchableOpacity style={{ marginRight: 20 }} key="deletebtn" onPress={this.confirmDeletion}><FontIcon name="trash-alt" size={16} color={'#f5fcff'} /></TouchableOpacity>;

        return(
            <View style={MainStyles.container}>
                <CustomHeader title={client.name} navigation={this.props.navigation} buttons={[wbtn, rbtn, compbtn, editbtn, deletebtn]} />
                <Card>
                    <CardItem>
                        <View style={MainStyles.clientcontainer}>
                        <View style={[MainStyles.clientbadgecontainer, MainStyles.clientinitialscontainer]}>
                            <Text style={MainStyles.clientbadge}>{this.clientInitials(client.name)}</Text>
                        </View>
                        <View style={MainStyles.clientcontentcontainer}>
                            <Text style={[MainStyles.clientname, MainStyles.clientinfo]}> {client.name} </Text>
                            <Text style={[MainStyles.clientdetail, MainStyles.clientinfo]}> {this.fName(client)} {this.lName(client)} </Text>
                        </View>
                        </View>
                </CardItem>
                <FlatListItemSeparator />
                <CardItem>
                <View style={MainStyles.clientcontainer}>
                        <View style={MainStyles.clientbadgecontainer}>
                            <FontIcon name="phone" style={{transform: [ {rotateY: '180deg'}]}} size={30} color={GLOBAL.headerBackground} />
                        </View>
                        <View style={MainStyles.clientcontentcontainer}>
                            <Text style={[MainStyles.clientname, MainStyles.clientinfo]}> {client.phone} </Text>
                        </View>
                        </View>
                </CardItem>
                <FlatListItemSeparator />
                <CardItem>
                <View style={MainStyles.clientcontainer}>
                        <View style={MainStyles.clientbadgecontainer}>
                        <FontIcon name="envelope" solid size={30} color={GLOBAL.headerBackground} />
                        </View>
                        <View style={MainStyles.clientcontentcontainer}>
                            <Text style={[MainStyles.clientname, MainStyles.clientinfo]}>{client.email}</Text>
                        </View>
                        </View>

                </CardItem>
                <FlatListItemSeparator />
                <CardItem>
                <View style={MainStyles.clientcontainer}>
                        <View style={MainStyles.clientbadgecontainer}>
                        <FontIcon name="map-marker-alt" size={30} color={GLOBAL.headerBackground} />
                        </View>
                        <View style={MainStyles.clientcontentcontainer}>
                            <Text style={[MainStyles.clientname, MainStyles.clientinfo]}>{client.addr1} {client.addr2}</Text>
                            <Text style={[MainStyles.clientname, MainStyles.clientinfo]}>{client.city}, {client.state}</Text>
                            <Text style={[MainStyles.clientname, MainStyles.clientinfo]}>{client.country}, {client.zip}</Text>
                        </View>
                        </View>
                </CardItem>
            </Card>
            </View>
        )
    }

}
