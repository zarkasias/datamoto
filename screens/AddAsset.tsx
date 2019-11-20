import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Form, Item, Input, Label } from 'native-base';

import { FormHeader } from '../components/FormHeader'

import MainStyles from '../assets/styles/MainStyles'
import FormStyles from '../assets/styles/FormStyles'
import GLOBAL from '../global'

export default class AddAsset extends Component {



    state = {
        description: undefined,
        model: undefined,
        serialNo: undefined,
        manufacturer: undefined,
        id: undefined,
        client: this.props.navigation.getParam('client', {})
    };


    componentDidMount() {
        this.state.client= this.props.navigation.getParam('client', {});
        const asset = this.props.navigation.getParam('asset');
        //console.log('Got It');
        //console.log(this.state.client);
        if (asset) {
            this.setState({
                description: asset.description || undefined,
                model: asset.model || undefined,
                serialNo: asset.serialNo || undefined,
                manufacturer: asset.manufacturer || undefined,
                id: asset.id || undefined
            });
        }
    };


    saveclient = () => {
        console.log(this.state);
        console.log(this.state.client.id);
        let mthd = 'addClientAsset';
        if (this.state.id) {
          mthd = 'updateClientAsset';
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
             "clientId": this.state.client.id,
             "companyName": this.state.client.name,
             "description": this.state.description,
             "model": this.state.model,
             "serialNo": this.state.serialNo,
             "manufacturer": this.state.manufacturer,
             "id": this.state.id
         })
         });
         const clnt = await rawResponse.json();
         console.log(clnt);
         this.props.navigation.navigate('AssetList');
         })();
    }


    render() {


        let savebtn = <TouchableOpacity style={{ marginRight: 20 }} onPress={this.saveclient} key="savebtn"><Text style={{ color: GLOBAL.headerBackground, fontWeight: '600' }}>SAVE</Text></TouchableOpacity>;

        return(
            <View style={MainStyles.container}>
                <FormHeader title="Cancel" navigation={this.props.navigation} props={[savebtn]} />


                <Form style={FormStyles.clientform}>
                    <Item floatingLabel style={FormStyles.item}>
                    <Label style={FormStyles.label}>Description</Label>
                    <Input value={this.state.description}  onChangeText={(e) => this.setState({description: e})}  />
                    </Item>
                    <Item floatingLabel style={FormStyles.item}>
                    <Label style={FormStyles.label}>Model</Label>
                    <Input value={this.state.model}  onChangeText={(e) => this.setState({model: e})} />
                    </Item>
                    <Item floatingLabel style={FormStyles.item}>
                    <Label style={FormStyles.label}>Serial Number</Label>
                    <Input value={this.state.serialNo} onChangeText={(e) => this.setState({serialNo: e})} />
                    </Item>
                    <Item floatingLabel last style={FormStyles.item}>
                    <Label style={FormStyles.label}>Manufacturer</Label>
                    <Input value={this.state.manufacturer} onChangeText={(e) => this.setState({manufacturer: e})} />
                    </Item>
                </Form>

            </View>
        )
    }
}
