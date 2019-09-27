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

    clientInitials = (fname, lname) => {
        return fname[0] + lname[0];
    };

    confirmDeletion = () => {
        AlertDeletion(this.deleteclient);
    }

    toAssetList = () => {
        this.props.navigation.navigate("AssetList");
    }

    deleteclient = () => {
        console.log('delete client called');
    }

    editclient = () => {
        console.log('edit client called');
    }

    render() {

        const { client } = this.state;

        console.log(client);

        let compbtn = <TouchableOpacity style={{ marginRight: 20 }} key="compbtn" onPress={this.toAssetList}><FontIcon name="desktop" size={22} color={'#f5fcff'} /></TouchableOpacity>;
        let editbtn = <TouchableOpacity style={{ marginRight: 20 }} key="editbtn" onPress={this.editclient}><FontIcon name="pencil-alt" size={22} color={'#f5fcff'} /></TouchableOpacity>;
        let deletebtn = <TouchableOpacity style={{ marginRight: 20 }} key="deletebtn" onPress={this.confirmDeletion}><FontIcon name="trash-alt" size={22} color={'#f5fcff'} /></TouchableOpacity>;

        return(
            <View style={MainStyles.container}>
                <CustomHeader title={this.clientname(client.fname, client.lname)} navigation={this.props.navigation} buttons={[compbtn, editbtn, deletebtn]} />
                <Card>
                    <CardItem>   
                        <View style={MainStyles.clientcontainer}>
                        <View style={[MainStyles.clientbadgecontainer, MainStyles.clientinitialscontainer]}>
                            <Text style={MainStyles.clientbadge}>{this.clientInitials(client.fname, client.lname)}</Text>  
                        </View>
                        <View style={MainStyles.clientcontentcontainer}>
                            <Text style={[MainStyles.clientname, MainStyles.clientinfo]}> {client.fname} {client.lname} </Text>
                            <Text style={[MainStyles.clientdetail, MainStyles.clientinfo]}> {client.city} </Text>
                <Text style={[MainStyles.clientdetail, MainStyles.clientinfo]}> {client.email} </Text>
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