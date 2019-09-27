import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Form, Item, Input, Label } from 'native-base';

import PickerSelect from 'react-native-picker-select';

import FontIcon from 'react-native-vector-icons/FontAwesome5';

import { FormHeader } from '../components/FormHeader'

import MainStyles from '../assets/styles/MainStyles'
import FormStyles from '../assets/styles/FormStyles'
import GLOBAL from '../global'

export default class AddAsset extends Component {

    

    state = {
        description: undefined,
        model: undefined,
        serialNo: undefined,
        manufacturer: undefined
    };  


    componentDidMount() {
        const asset = this.props.navigation.getParam('asset');

        if (asset) {
            this.setState({
                description: asset.description || undefined,
                model: asset.model || undefined,
                serialNo: asset.serialNo || undefined,
                manufacturer: asset.manufacturer || undefined
            });
        }
    };


    saveclient = () => {
        console.log(this.state);
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