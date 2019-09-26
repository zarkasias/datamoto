import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Form, Item, Input, Label, Text, Button } from 'native-base';

import { CustomHeader } from '../components/Header'

import MainStyles from '../assets/styles/MainStyles'
import FormStyles from '../assets/styles/FormStyles'
import GLOBAL from '../global'


export default class Login extends Component {

   
    state = {
        username: '',
        password: ''
    }

    loginApplication = () => {
        
        GLOBAL.apikey = "23452342353";
        this.props.navigation.navigate('ClientList');
    }
  
    render() {

        let logo = <Image key={0} style={{width: 129, height: 29, marginRight: 20}} source={require('../assets/logo.png')} />;

        return(
            <View style={MainStyles.container}>
            <CustomHeader title="Datamoto" navigation={''} props={[logo]} />
            <View style={FormStyles.content}>

                <Form style={FormStyles.loginform}>
                    <Item floatingLabel style={FormStyles.item}>
                    <Label>Username</Label>
                    <Input onChangeText={(e) => this.setState({username: e})}  />
                    </Item>
                    <Item floatingLabel last style={FormStyles.item}>
                    <Label>Password</Label>
                    <Input secureTextEntry onChangeText={(e) => this.setState({password: e})} />
                    </Item>
                    
                    <Button block style={FormStyles.button} onPress={() => this.loginApplication()}>
                        <Text>Login</Text>
                    </Button>
                </Form>
            
             </View>   
            </View>
        )
    }
}
